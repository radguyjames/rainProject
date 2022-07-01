from xml.dom.minidom import Document
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, redirect

from .serializers import requisitionSerializer, ScheduleProtocolSerializer, CalendarEventSerializer, \
    CalendarEventDTPreSerializer, CalendarEventUpdateSerializer, FinishProtocolSerializer, CalendarEventIdSerializer, \
    CalendarEventEarlyCompleteSerializer, ScheduleProtocolIdSerializer, ScheduleProtocolProtocolConnectorSerializer, \
    ScheduleProtocolSequenceConnectorSerializer
from .models import CustomRequisition, ScheduleProtocol, CalendarEvent, FinishProtocol, \
    ScheduleProtocolProtocolConnector, ScheduleProtocolSequenceConnector
from datetime import datetime, timedelta
from django.utils.timezone import localtime, now

# Searches for keywords based on the clinicalInformation input and saves the results as variables.
from ..patientRequirements.models import MobilityRequirement, IsolationPrecaution, SedationRequirement
from ..protocols.models import ProtocolSequenceConnector, Type, TypeSubpart, Protocol, ProtocolKeywordConnector, \
    Sequence

"""
Automatically sets sequences and suggested protocol for ScheduleProtocol entry given anatomical location, clinical information, and a custom requisition ID.
"""


def selectProtocol(anatomicalLocation, clinicalInformation, reqID):
    protocolSet = Protocol.objects.filter(type=anatomicalLocation)  # Queryset of protocols filtered by type
    protocolsWithZeroKeyword = []  # List of protocols with any keyword contained in clinicalInformation without points
    protocolsWithPointKeyword = []  # List of protocols with any keyword contained in clinicalInformation with points
    protocolsTotalPoints = {}  # Dictionary of protocol IDs and the total points relevant to that protocol
    sequenceIDs = []  # List of IDs of sequences that need to be applied to scheduleProtocol entry

    winningProtocols = []  # List of winning protocol IDs to be added to scheduleProtocol entry
    confidenceInterval = 100  # System confidence as percentage that it has chosen the most relevant protocol
    timingTotal = 0  # Sum of the timings of the winning protocols
    sequences = []  # Array of all sequences attached to winning protocols
    sequencesString = ""  # String of all sequences attached to winning protocols

    # Filter protocols down to only ones that have at least 1 keyword that appears in clinicalInformation
    for protocol in protocolSet:
        connectors = ProtocolKeywordConnector.objects.filter(protocolID=protocol.id)

        for connector in connectors:
            if clinicalInformation.lower().find(connector.keywordID.keyword.lower()) != -1:
                if connector.keywordID.points == 0:
                    protocolsWithZeroKeyword.append(protocol.id)
                else:
                    protocolsWithPointKeyword.append({'protocol': protocol.id, 'points': connector.keywordID.points})

    # Create dict of protocol IDs and total points from relevant keywords
    for i in protocolsWithPointKeyword:
        if i['protocol'] not in protocolsTotalPoints.keys():
            protocolsTotalPoints[i['protocol']] = i['points']
        else:
            protocolsTotalPoints[i['protocol']] += i['points']

    # Find first and second highest point totals amongst relevant protocols
    first = 0  # Highest point total
    second = 0  # Second highest point total
    firstID = 0  # ID of protocol with highest point total
    secondID = 0  # ID of protocol with second highest point total

    for key, value in protocolsTotalPoints.items():
        if value >= first:
            second = first
            first = value
            secondID = firstID
            firstID = key

    # Add protocol with most points and all protocols containing a keyword with 0 points to winning list
    winningProtocols.append(firstID)

    for i in protocolsWithZeroKeyword:
        winningProtocols.append(i)

    # Calculate confidence interval
    if first != 0:
        confidenceInterval = round((1 - (second / first)) * 100, 2)

    # Sum winning protocol timings and get winning protocol sequences
    for i in protocolSet:
        for j in winningProtocols:
            if j == i.id:
                timingTotal += i.examTime

                # Create list of sequences to apply later
                sequenceSet = ProtocolSequenceConnector.objects.filter(protocolID=j)

                for sequence in sequenceSet:
                    sequenceIDs.append(sequence.sequenceID.id)
                    print(sequenceIDs)

    # Save ScheduleProtocol entry to database
    data = {
        'customRequisition': reqID,
        'timing': timingTotal,
        'confidence': confidenceInterval,
        'approvalLevel': 'Pending Coding',
    }

    scheduleProtocolSerializer = ScheduleProtocolSerializer(data=data)
    scheduleProtocolSerializer.is_valid(raise_exception=True)
    newDocument = scheduleProtocolSerializer.save()

    # Propogate winning protocols and sequences to connector table
    if newDocument:
        # Protocols
        for i in winningProtocols:
            connectorSerializer = ScheduleProtocolProtocolConnectorSerializer(
                data={'ScheduleProtocolID': newDocument.id, 'ProtocolID': i})
            connectorSerializer.is_valid(raise_exception=True)
            connectorSerializer.save()

        # Sequences
        for i in sequenceIDs:
            connectorSerializer = ScheduleProtocolSequenceConnectorSerializer(
                data={'scheduleProtocolID': newDocument.id, 'sequenceID': i})
            connectorSerializer.is_valid(raise_exception=True)
            connectorSerializer.save()


"""
Gets documents or performs Create tasks on the CustomRequisition collection.
Access GET, POST at: http://127.0.0.1:8000/api/auth/requisition
"""


class requisitionAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = requisitionSerializer

    # GET
    # RETURN: response:requisition
    def get(self, request, *args, **kwargs):
        documents = CustomRequisition.objects.all()
        serializer = requisitionSerializer(documents, many=True)
        return Response({"requisition": serializer.data})

    # CREATE
    # PARAMS: <string:anatomicalLocation>
    #         <string:clinicalInformation>
    #         <string:subLocation>
    # RETURN: 200 OK, 400 BAD REQUEST
    # EXCEPTION:
    #         Occurs when the anatomical location is not on the list.
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        newRequisition = serializer.save()

        # Variables to hold the POST data.
        anatomicalLocation = request.data['anatomicalLocation']
        clinicalInformation = request.data['clinicalInformation']
        clinicalInformation += TypeSubpart.objects.get(id=request.data['subLocation']).subtype

        selectProtocol(anatomicalLocation, clinicalInformation, newRequisition.id)

        return Response(
            {"objRequisition": requisitionSerializer(newRequisition, context=self.get_serializer_context()).data})


"""
Gets documents on the ScheduleProtocol collection.
Access GET at: http://127.0.0.1:8000/api/auth/protocolDetail
"""


class ProtocolDetail(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ScheduleProtocolSerializer

    # GET
    # PARAMS: <int:scheduleProtocol>
    # RETURN: response:objScheduleProtocol
    def get(self, request):
        if request.GET.get('scheduleProtocol'):
            scheduleProtocol = ScheduleProtocol.objects.filter(
                id=request.GET.get('scheduleProtocol'))
        else:
            scheduleProtocol = ScheduleProtocol.objects.all()
        # The many param informs the serializer it will be serializing more than one requisition.
        serializer = ScheduleProtocolSerializer(scheduleProtocol, many=True)
        return Response({"objScheduleProtocol": serializer.data})


"""
Gets documents or performs CRU tasks on the ScheduleProtocol collection.
Access GET, POST, PUT at: http://127.0.0.1:8000/api/auth/scheduleProtocol
"""


class ScheduleProtocolAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ScheduleProtocolSerializer

    # CREATE
    # PARAMS: <string:approvalLevel>
    #         <string:clinicalInformation>
    #         <int:scheduleProtocol_id>
    #         <string:suggestedProtocol>
    #         <int:timing>
    #         <int:urgency>
    #         <int:priority>
    #         <string:sequences>
    #         <string:feedback>
    # RETURN: 200 OK, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Declaring variables from post.
        approvalLevel = request.data['approvalLevel']
        clinicalInformation = request.data['clinicalInformation']
        scheduleProtocol_id = request.data['scheduleProtocol_id']
        # suggestedProtocol = request.data['suggestedProtocol']
        timing = request.data['timing']
        urgency = request.data['urgency']
        priority = request.data['priority']
        sequences = request.data['sequences']
        feedback = request.data.get('feedback', None)

        # Updating the document based on post variables if approval level is coding or timing.
        for e in ScheduleProtocol.objects.filter(id=scheduleProtocol_id):
            # Updating the attached foreign key data.
            for s in CustomRequisition.objects.filter(id=e.customRequisition.id):
                # e.suggestedProtocol = suggestedProtocol
                e.timing = timing
                e.approvalLevel = approvalLevel
                e.id = scheduleProtocol_id
                e.sequences = sequences
                # The `s` represents the foreign key data.
                s.urgency = urgency
                s.priority = priority
                s.clinicalInformation = clinicalInformation
                s.height = s.height.to_decimal()
                s.weight  = s.weight.to_decimal()
                if feedback:
                    s.feedback = s.feedback + "\n" + feedback
                e.save()
                s.save()

        return (
            # "objScheduleProtocol": ScheduleProtocolSerializer(newScheduleProtocol, context=self.get_serializer_context()).data,
            redirect('http://127.0.0.1:8000/#/apps/protocolmanagement')
        )

    # GET
    # PARAMS: <int:role> <string:approvalLevel>
    # RETURN: response:objScheduleProtocol
    def get(self, request):

        # Handles showing the protocols for the correct role. all is used in outstanding protocols while protocol page is handeled by the other 3.
        print(request.GET.get('role'))
        role = request.GET.get('role')
        approvalLevel = request.GET.get('approvalLevel')
        schedulingPage = "Pending Scheduling"

        # The role `all` is for OutstandingProtocol page.
        if role == "all":
            scheduleProtocol = ScheduleProtocol.objects.exclude(
                approvalLevel=schedulingPage)
            serializer = ScheduleProtocolSerializer(
                scheduleProtocol, many=True)
            return Response({"objScheduleProtocol": serializer.data})
        # Admin role.
        elif role == "-2":
            scheduleProtocol = ScheduleProtocol.objects.exclude(
                approvalLevel=schedulingPage)
            serializer = ScheduleProtocolSerializer(
                scheduleProtocol, many=True)
            return Response({"objScheduleProtocol": serializer.data})
        # Radiologist role.
        elif role == "2":
            scheduleProtocol = ScheduleProtocol.objects.filter(
                approvalLevel="Pending Coding")
            serializer = ScheduleProtocolSerializer(
                scheduleProtocol, many=True)
            return Response({"objScheduleProtocol": serializer.data})
        # Technician role.
        elif role == "3":
            scheduleProtocol = ScheduleProtocol.objects.filter(
                approvalLevel="Pending Timing")
            serializer = ScheduleProtocolSerializer(
                scheduleProtocol, many=True)
            return Response({"objScheduleProtocol": serializer.data})

    # UPDATE
    # PARAMS: <string:approvalLevel>
    #         <string:clinicalInformation>
    #         <int:scheduleProtocol_id>
    #         <array[Protocol]:suggestedProtocol>
    #         <int:timing>
    #         <int:urgency>
    #         <int:priority>
    #         <array[Sequence]:sequences>
    #         <string:feedback>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Declaring variables from post.
        approvalLevel = request.data.get('approvalLevel')
        clinicalInformation = request.data.get('clinicalInformation')
        scheduleProtocol_id = request.data.get('scheduleProtocol_id')
        suggestedProtocol = request.data.get('suggestedProtocol')
        timing = request.data.get('timing')
        urgency = request.data.get('urgency')
        priority = request.data.get('priority')
        sequences = request.data.get('sequences')
        feedback = request.data.get('feedback')

        # Gets foreign key ID and original feedback.
        customRequisition_id = ScheduleProtocol.objects.only('customRequisition').get(pk=scheduleProtocol_id).customRequisition.id

        # Update target document.
        ScheduleProtocol.objects.filter(id=scheduleProtocol_id).update(
            timing=timing,
            approvalLevel=approvalLevel,
        )

        # Updating the attached foreign key data.
        CustomRequisition.objects.filter(id=customRequisition_id).update(
            urgency=urgency,
            priority=priority,
            clinicalInformation=clinicalInformation,
            feedback=feedback
        )
        
        ScheduleProtocolProtocolConnector.objects.filter(ScheduleProtocolID=scheduleProtocol_id).delete()
        ScheduleProtocolSequenceConnector.objects.filter(scheduleProtocolID=scheduleProtocol_id).delete()
        
        # Propogate many-to-many relationships to connectors
        parsedProtocolID = []
            
        for i in suggestedProtocol:
            try:
                parsedProtocolID.append(i["id"])
            except Exception:
                continue
            
        if len(parsedProtocolID) > 0:
            for i in parsedProtocolID:
                sequenceSerializer = ScheduleProtocolProtocolConnectorSerializer(data={"ScheduleProtocolID" : scheduleProtocol_id, "ProtocolID" : i})
                if sequenceSerializer.is_valid():
                    sequenceSerializer.save()
                  
        # Propogate many-to-many relationships to connectors
        parsedSequenceID = []
            
        for i in sequences:
            try:
                parsedSequenceID.append(i["id"])
            except Exception:
                continue
            
        if len(parsedSequenceID) > 0:
            for i in parsedSequenceID:
                sequenceSerializer = ScheduleProtocolSequenceConnectorSerializer(data={"scheduleProtocolID" : scheduleProtocol_id, "sequenceID" : i})
                if sequenceSerializer.is_valid():
                    sequenceSerializer.save()

        return Response(status=status.HTTP_200_OK)


"""
Gets documents on the scheduleProtocol collection.
Access GET at: http://127.0.0.1:8000/api/auth/scheduleProtocolPage
"""


class ScheduleProtocolPageAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ScheduleProtocolSerializer

    # GET
    # PARAMS: <int:role> <string:approvalLevel>
    # RETURN: response:objScheduleProtocol
    def get(self, request):
        # role = request.GET.get('role')
        approvalLevel = request.GET.get('approvalLevel')

        scheduleProtocol = ScheduleProtocol.objects.filter(
            approvalLevel=approvalLevel)
        serializer = ScheduleProtocolSerializer(
            scheduleProtocol, many=True)
        return Response({"objScheduleProtocol": serializer.data})


"""
Gets documents or perform CRUD tasks on the FinishProtocol collection.
Access GET, POST, PUT at: http://127.0.0.1:8000/api/auth/finishProtocol
"""


class FinishProtocolAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = FinishProtocolSerializer

    # CREATE
    # PARAMS: <int:calendarEvent_id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        calendarEvent_id = request.data['calendarEvent_id']

        CEData = {
            "calendarEvent_id": calendarEvent_id
        }

        # Validates given calendar event id.
        CEserializer = CalendarEventIdSerializer(data=CEData)
        CEserializer.is_valid(raise_exception=True)

        # Adds the document to the FinishProtocol table.
        # Deletes from: CalendarEvent, ScheduleProtocol, and CustomRequisition table.
        for e in CalendarEvent.objects.filter(id=calendarEvent_id):
            for p in ScheduleProtocol.objects.filter(id=e.scheduleProtocol.id):
                for c in CustomRequisition.objects.filter(id=p.customRequisition.id):
                    suggestedProtocol = []
                    sequences = []
                    isolationPrecaution = \
                        mobilityRequirement = \
                        sedationRequirement = \
                        sedationRequirement_message = "None"

                    anatomicalLocation = Type.objects.only('type').get(pk=c.anatomicalLocation.id).type
                    subLocation = TypeSubpart.objects.only('subtype').get(pk=c.subLocation.id).subtype
                    protocolList = ScheduleProtocolProtocolConnector.objects.filter(
                        ScheduleProtocolID=e.scheduleProtocol.id).values_list('ProtocolID', flat=True)
                    sequenceList = ScheduleProtocolSequenceConnector.objects.filter(
                        scheduleProtocolID=e.scheduleProtocol.id).values_list('sequenceID', flat=True)

                    for i in range(len(protocolList)):
                        suggestedProtocol.append(
                            Protocol.objects.only('protocol').get(pk=protocolList[i]).protocol
                        )

                    for j in range(len(sequenceList)):
                        sequences.append(
                            Sequence.objects.only('sequence').get(pk=sequenceList[j]).sequence
                        )

                    suggestedProtocol = list(dict.fromkeys(suggestedProtocol))
                    sequences = list(dict.fromkeys(sequences))

                    suggestedProtocol = ', '.join(suggestedProtocol)
                    sequences = ', '.join(sequences)

                    if c.isolationPrecaution:
                        isolationPrecaution = IsolationPrecaution.objects.only('isolationPrecaution').get(
                            pk=c.isolationPrecaution.id).isolationPrecaution

                    if c.mobilityRequirement:
                        mobilityRequirement = MobilityRequirement.objects.only('mobilityRequirement').get(
                            pk=c.mobilityRequirement.id).mobilityRequirement

                    if c.sedationRequirement:
                        sedationRequirement = SedationRequirement.objects.only('sedationRequirement').get(
                            pk=c.sedationRequirement.id).sedationRequirement
                        sedationRequirement_message = SedationRequirement.objects.only('message').get(
                            pk=c.sedationRequirement.id).message

                    finishProtocol = {
                        "startDateTime": e.startDateTime,
                        "endDateTime": e.endDateTime,
                        "suggestedProtocol": suggestedProtocol,
                        "timing": p.timing,
                        "approvalLevel": p.approvalLevel,
                        "confidence": p.confidence,
                        "sequences": sequences,
                        "clinicalInformation": c.clinicalInformation,
                        "urgency": c.urgency,
                        "priority": c.priority,
                        "dateCreated": c.dateCreated,
                        "patientFirstName": c.patientFirstName,
                        "patientLastName": c.patientLastName,
                        "phin": c.phin,
                        "weight": c.weight.to_decimal(),
                        "height": c.height.to_decimal(),
                        "ward": c.ward,
                        "anatomicalLocation": anatomicalLocation,
                        "subLocation": subLocation,
                        "clinician": c.clinician,
                        "gender": c.gender,
                        "dob": c.dob,
                        "feedback": c.feedback,
                        "additionalComments": c.additionalComments,
                        "isolationPrecaution": isolationPrecaution,
                        "mobilityRequirement": mobilityRequirement,
                        "sedationRequirement": sedationRequirement,
                        "sedationRequirement_message": sedationRequirement_message
                    }

                    serializer = self.get_serializer(data=finishProtocol)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()

                    e.delete()
                    p.delete()
                    c.delete()

        return Response(status=status.HTTP_201_CREATED)

    # Permit GET requests on finishProtocol data.
    def get(self, request):
        finishProtocol = FinishProtocol.objects.all()
        serializer = FinishProtocolSerializer(finishProtocol, many=True)
        return Response({"objFinishProtocol": serializer.data})

    # Permit PUT requests on FinishProtocol data.
    def put(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        savedFinishProtocol = get_object_or_404(
            FinishProtocol.objects.all(), pk=pk)
        data = request.data.get('objFinishProtocol')
        serializer = FinishProtocolSerializer(
            instance=savedFinishProtocol, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            savedFinishProtocol_saved = serializer.save()
            return Response(
                {"success": "Finish Protocol '{}' updated successfully".format(savedFinishProtocol_saved.id)})


"""
Creates tasks on the FinishProtocol collection.
Access POST at: http://127.0.0.1:8000/api/auth/denyProtocol
Resource: http://morozov.ca/tip-how-to-get-a-single-objects-value-with-django-orm.html
"""


class DenyProtocolAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = FinishProtocolSerializer

    # CREATE
    # PARAMS: <int:scheduleProtocol_id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        scheduleProtocol_id = request.data['scheduleProtocol_id']
        deniedMessage = request.data['deniedMessage']
        currentDate = localtime(now()).isoformat()

        SGData = {
            "scheduleProtocol_id": scheduleProtocol_id
        }

        # Validates given calendar event id.
        SGserializer = ScheduleProtocolIdSerializer(data=SGData)
        SGserializer.is_valid(raise_exception=True)

        # Adds the document to the FinishProtocol table.
        # Deletes from: ScheduleProtocol and CustomRequisition table.
        for p in ScheduleProtocol.objects.filter(id=scheduleProtocol_id):
            for c in CustomRequisition.objects.filter(id=p.customRequisition.id):
                suggestedProtocol = []
                sequences = []
                isolationPrecaution = \
                    mobilityRequirement = \
                    sedationRequirement = \
                    sedationRequirement_message = "None"

                anatomicalLocation = Type.objects.only('type').get(pk=c.anatomicalLocation.id).type
                subLocation = TypeSubpart.objects.only('subtype').get(pk=c.subLocation.id).subtype
                protocolList = ScheduleProtocolProtocolConnector.objects.filter(
                    ScheduleProtocolID=scheduleProtocol_id).values_list('ProtocolID', flat=True)
                sequenceList = ScheduleProtocolSequenceConnector.objects.filter(
                    scheduleProtocolID=scheduleProtocol_id).values_list('sequenceID', flat=True)

                for i in range(len(protocolList)):
                    suggestedProtocol.append(
                        Protocol.objects.only('protocol').get(pk=protocolList[i]).protocol
                    )

                for j in range(len(sequenceList)):
                    sequences.append(
                        Sequence.objects.only('sequence').get(pk=sequenceList[j]).sequence
                    )

                suggestedProtocol = list(dict.fromkeys(suggestedProtocol))
                sequences = list(dict.fromkeys(sequences))

                suggestedProtocol = ', '.join(suggestedProtocol)
                sequences = ', '.join(sequences)

                if c.isolationPrecaution:
                    isolationPrecaution = IsolationPrecaution.objects.only('isolationPrecaution').get(
                        pk=c.isolationPrecaution.id).isolationPrecaution

                if c.mobilityRequirement:
                    mobilityRequirement = MobilityRequirement.objects.only('mobilityRequirement').get(
                        pk=c.mobilityRequirement.id).mobilityRequirement

                if c.sedationRequirement:
                    sedationRequirement = SedationRequirement.objects.only('sedationRequirement').get(
                        pk=c.sedationRequirement.id).sedationRequirement
                    sedationRequirement_message = SedationRequirement.objects.only('message').get(
                        pk=c.sedationRequirement.id).message

                finishProtocol = {
                    "startDateTime": currentDate,
                    "endDateTime": currentDate,
                    "suggestedProtocol": suggestedProtocol,
                    "timing": p.timing,
                    "approvalLevel": p.approvalLevel,
                    "confidence": p.confidence,
                    "sequences": sequences,
                    "clinicalInformation": c.clinicalInformation,
                    "urgency": c.urgency,
                    "priority": c.priority,
                    "dateCreated": c.dateCreated,
                    "patientFirstName": c.patientFirstName,
                    "patientLastName": c.patientLastName,
                    "phin": c.phin,
                    "weight": c.weight.to_decimal(),
                    "height": c.height.to_decimal(),
                    "ward": c.ward,
                    "anatomicalLocation": anatomicalLocation,
                    "subLocation": subLocation,
                    "clinician": c.clinician,
                    "gender": c.gender,
                    "dob": c.dob,
                    "feedback": c.feedback,
                    "additionalComments": c.additionalComments,
                    "isolationPrecaution": isolationPrecaution,
                    "mobilityRequirement": mobilityRequirement,
                    "sedationRequirement": sedationRequirement,
                    "sedationRequirement_message": sedationRequirement_message,
                    "deniedMessage": deniedMessage
                }

                serializer = self.get_serializer(data=finishProtocol)
                serializer.is_valid(raise_exception=True)
                serializer.save()

                p.delete()
                c.delete()

        return Response(status=status.HTTP_201_CREATED)


# Archive API
class ArchiveAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = requisitionSerializer

    # Permit GET requests on requisition data.
    def get(self, request):
        if request.GET.get('anatomicalLocation') == "Any":
            requisitions = CustomRequisition.objects.filter(
                patientFirstName__icontains=request.GET.get('firstName')).filter(
                patientLastName__icontains=request.GET.get('lastName')).filter(
                dateCreated__gte=request.GET.get('startDate')).filter(
                dateCreated__lte=request.GET.get('endDate'))
        else:
            requisitions = CustomRequisition.objects.filter(
                patientFirstName__icontains=request.GET.get('firstName')).filter(
                patientLastName__icontains=request.GET.get('lastName')).filter(
                dateCreated__gte=request.GET.get('startDate')).filter(
                dateCreated__lte=request.GET.get('endDate')).filter(
                anatomicalLocation=request.GET.get('anatomicalLocation'))

        # The many param informs the serializer it will be serializing more than one requisition.get({"patientName": request.data.name})
        serializer = requisitionSerializer(requisitions, many=True)
        return Response({"objRequisition": serializer.data})


"""
Gets documents or performs CRUD tasks on the CalendarEvent collection.
Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/calendarEvents
"""


class CalendarEventAPI(generics.GenericAPIView):
    # GET
    # PARAMS: <int:scheduleProtocol>
    # RETURN: response:objCalendarEvent
    def get(self, request, *args, **kwargs):
        # Gets all documents if id is not set or 1 if id is set.
        if request.GET.get("scheduleProtocol", None):
            documents = CalendarEvent.objects.filter(
                scheduleProtocol=request.GET.get("scheduleProtocol", None))
        else:
            documents = CalendarEvent.objects.all()

        serializer = CalendarEventSerializer(documents, many=True)

        return Response({"objCalendarEvent": serializer.data})

    # CREATE
    # PARAMS: <datetime:startDateTime> <int:timing>
    # RETURN: 200 OK, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        startDateTimeString = request.data.get("startDateTime")
        timing = request.data.get("timing")
        scanner = request.data.get("scanner", 1)

        DTData = {
            "startDateTime": startDateTimeString,
            "timing": timing,
            "scanner": scanner
        }

        # Validates given start datetime and timing.
        DTserializer = CalendarEventDTPreSerializer(data=DTData)
        DTserializer.is_valid(raise_exception=True)

        # Builds endDateTime from startDateTime and timing.
        dateFormat = "%Y-%m-%dT%H:%M"
        startDateTime = datetime.strptime(startDateTimeString,
                                          dateFormat)  # Parse passed datetime string into Python datetime object
        endDateTime = startDateTime + timedelta(minutes=int(timing))  # Add time
        endDateTime = endDateTime.strftime(dateFormat)  # Format datetime object back into string

        fullData = {
            "scheduleProtocol": request.data.get("scheduleProtocol"),
            "startDateTime": startDateTime,
            "endDateTime": endDateTime
        }

        # Validates CalendarEvent against model.
        serializer = CalendarEventSerializer(data=fullData)
        serializer.is_valid(raise_exception=True)

        # Gets next ID increment.
        try:
            newID = CalendarEvent.objects.latest("id").id + 1
        except Exception as e:
            newID = 1

        # Creates new CalendarEvent.
        document = CalendarEvent(id=newID,
                                 startDateTime=startDateTimeString,
                                 endDateTime=endDateTime,
                                 scheduleProtocol=ScheduleProtocol.objects.get(
                                     id=request.data.get("scheduleProtocol")),
                                 scanner=scanner
                                 )
        document.save()

        return Response(status=status.HTTP_201_CREATED)

    # UPDATE
    # PARAMS: <int:scheduleProtocol> <datetime:startDateTime> <int:timing>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        data = {
            "scheduleProtocol": request.data.get("scheduleProtocol"),
            "startDateTime": request.data.get("startDateTime"),
            "timing": request.data.get("timing")
        }

        # Validates incoming data.
        serializer = CalendarEventUpdateSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Builds endDateTime from startDateTime and timing.
        dateFormat = "%Y-%m-%dT%H:%M"
        startDateTime = datetime.strptime(request.data.get("startDateTime"),
                                          dateFormat)  # Parse passed datetime string into Python datetime object
        endDateTime = startDateTime + timedelta(minutes=int(request.data.get("timing")))  # Add time
        endDateTime = endDateTime.strftime(dateFormat)  # Format datetime object back into string

        # Updates target document.
        CalendarEvent.objects.filter(
            scheduleProtocol=request.data.get("scheduleProtocol")
        ).update(
            startDateTime=request.data.get("startDateTime"),
            endDateTime=endDateTime
        )

        return Response(status=status.HTTP_200_OK)

    # DELETE
    # PARAMS: <int:scheduleProtocol>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        try:
            CalendarEvent.objects.get(scheduleProtocol=request.query_params.get("scheduleProtocol")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


class CalendarEventEarlyCompleteAPI(generics.GenericAPIView):
    # UPDATE
    # PARAMS: <int:calendarEvent_id> <boolean:earlyComplete>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        data = {
            "calendarEvent_id": request.data.get("calendarEvent_id"),
            "earlyComplete": request.data.get("earlyComplete")
        }

        # Validates incoming data.
        serializer = CalendarEventEarlyCompleteSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Updates target document.
        CalendarEvent.objects.filter(
            id=request.data.get("calendarEvent_id")
        ).update(
            earlyComplete=request.data.get("earlyComplete")
        )

        return Response(status=status.HTTP_200_OK)
