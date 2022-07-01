from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from django.shortcuts import get_object_or_404
from .serializers import ExamCodeSerializer, ProtocolExamCodeConnectorSerializer, ProtocolSerializer, ProtocolSequenceConnectorSerializer, ProtocolKeywordConnectorSerializer, ProtocolExamCodeConnector, SequenceSerializer, TypeSerializer, TypeSubpartSerializer
from .models import Protocol, Sequence, Type, ProtocolKeywordConnector, ProtocolSequenceConnector, ProtocolExamCodeConnector, ExamCode, TypeSubpart

class ProtocolAPI(generics.GenericAPIView):
    """
    Protocol REST API
    Use this to retreive documents from, or to perform CRUD tasks on the protocol collection
    Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/protocols
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get documents
        if not request.GET.get("id") == None:
            documents = Protocol.objects.filter(id=request.GET.get("id", None)).order_by("protocol")
        else:
            documents = Protocol.objects.all().order_by("protocol")
            
        protocolSerializer = ProtocolSerializer(documents, many=True)
        protocols = protocolSerializer.data
            
        # Retreive sequence data from connector tables
        for protocol in protocols:
            connectors = ProtocolSequenceConnector.objects.filter(protocolID=protocol["id"])
            sequences = []
            
            for connector in connectors:
                sequences.append({"id":connector.sequenceID.id, "sequence":connector.sequenceID.sequence}) # connector.sequenceID should be an int from ProtocolSequenceConnector but it actually returns it's referential Sequence object.
                
            protocol.update(sequences=sequences)
        
        # Retreive keyword data from connector tables
        for protocol in protocols:
            connectors = ProtocolKeywordConnector.objects.filter(protocolID=protocol["id"])
            keywords = []
            
            for connector in connectors:
                keywords.append({"id":connector.keywordID.id, "keyword":connector.keywordID.keyword})
                
            protocol.update(keywords=keywords)
            
        # Retreive exam code data from connector tables
        for protocol in protocols:
            connectors = ProtocolExamCodeConnector.objects.filter(protocolID=protocol["id"])
            codes = []
            
            for connector in connectors:
                codes.append({"id":connector.examCodeID.id, "examCode":connector.examCodeID.examCode})
                
            protocol.update(examCodes=codes)
        
        return Response({"objProtocols": protocols})
    
    # CREATE
    # PARAMS: <string:protocol> <int:type> [int:examTime] [array[Sequence]:sequences] [array[Keyword]:keywords] [array[examCode]:examCodes]
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Create protocol record
        createData = {
            "protocol" : request.data.get("protocol"),
            "type" : request.data.get("type"),
            "examTime" : request.data.get("examTime", 0)
        }
        
        createSerializer = ProtocolSerializer(data=createData)
        createSerializer.is_valid(raise_exception=True)
        newRecord = createSerializer.save()
        
        # Mongo is not meant to work with Django, and Djongo just doesn't work, so adding FK arrays is extremly difficult.
        # This code handles the many-many relationships manualy, but in a way that is still transparent to the frontend.
        # It will also parse out bad input automatically and should never throw HTTP exceptions.
        if newRecord:
            # Parse and propagate many-many realtionships to sequence connector table
            sequences = request.data.get("sequences")
            parsedSequenceID = []
            
            for i in sequences:
                try:
                    parsedSequenceID.append(i["id"])
                except Exception:
                    continue
            
            if len(parsedSequenceID) > 0:
                for i in parsedSequenceID:
                    sequenceSerializer = ProtocolSequenceConnectorSerializer(data={"protocolID" : newRecord.id, "sequenceID" : i})
                    if sequenceSerializer.is_valid():
                        sequenceSerializer.save()
                        
            # Parse and propagate many-many realtionships to keyword connector table
            keywords = request.data.get("keywords")
            parsedkeywordID = []
            
            for i in keywords:
                try:
                    parsedkeywordID.append(i["id"])
                except Exception:
                    continue
                    
            if len(parsedkeywordID) > 0:
                for i in parsedkeywordID:
                    keywordSerializer = ProtocolKeywordConnectorSerializer(data={"protocolID" : newRecord.id, "keywordID" : i})
                    if keywordSerializer.is_valid():
                        keywordSerializer.save()
                        
            # Parse and propagate many-many realtionships to exam codes connector table
            codes = request.data.get("examCodes")
            parsedCodeID = []
            
            for i in codes:
                try:
                    parsedCodeID.append(i["id"])
                except Exception:
                    continue
                    
            if len(parsedCodeID) > 0:
                for i in parsedCodeID:
                    examCodeSerializer = ProtocolExamCodeConnectorSerializer(data={"protocolID" : newRecord.id, "examCodeID" : i})
                    if examCodeSerializer.is_valid():
                        examCodeSerializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> [string:protocol] [int:type] [string:examCode] [int:examTime] [array[Sequence]:sequences] [array[Keyword]:keywords] [array[examCode]:examCodes]
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Update target document
        record = get_object_or_404(Protocol, pk=request.data.get("id"))
        serializer = ProtocolSerializer(instance=record, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        newRecord = serializer.save()
        
        if newRecord:
            ProtocolSequenceConnector.objects.filter(protocolID=newRecord.id).delete()
            ProtocolKeywordConnector.objects.filter(protocolID=newRecord.id).delete()
            ProtocolExamCodeConnector.objects.filter(protocolID=newRecord.id).delete()
            
            # Parse and propagate many-many realtionships to sequence connector table
            sequences = request.data.get("sequences")
            parsedSequenceID = []
            
            for i in sequences:
                try:
                    parsedSequenceID.append(i["id"])
                except Exception:
                    continue
            
            if len(parsedSequenceID) > 0:
                for i in parsedSequenceID:
                    sequenceSerializer = ProtocolSequenceConnectorSerializer(data={"protocolID" : newRecord.id, "sequenceID" : i})
                    if sequenceSerializer.is_valid():
                        sequenceSerializer.save()
                        
            # Parse and propagate many-many realtionships to keyword connector table
            keywords = request.data.get("keywords")
            parsedkeywordID = []
            
            for i in keywords:
                try:
                    parsedkeywordID.append(i["id"])
                except Exception:
                    continue
                    
            if len(parsedkeywordID) > 0:
                for i in parsedkeywordID:
                    keywordSerializer = ProtocolKeywordConnectorSerializer(data={"protocolID" : newRecord.id, "keywordID" : i})
                    if keywordSerializer.is_valid():
                        keywordSerializer.save()
                        
            # Parse and propagate many-many realtionships to exam codes connector table
            codes = request.data.get("examCodes")
            parsedCodeID = []
            
            for i in codes:
                try:
                    parsedCodeID.append(i["id"])
                except Exception:
                    continue
                    
            if len(parsedCodeID) > 0:
                for i in parsedCodeID:
                    examCodeSerializer = ProtocolExamCodeConnectorSerializer(data={"protocolID" : newRecord.id, "examCodeID" : i})
                    if examCodeSerializer.is_valid():
                        examCodeSerializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            Protocol.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)
    
class SequenceAPI(generics.GenericAPIView):
    """
    Sequence REST API
    Use this to retreive documents from, or to perform CRUD tasks on the sequence collection
    Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/sequences
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents, by ID, or by search term
        if not request.GET.get("id") == None:
            documents = Sequence.objects.filter(id=request.GET.get("id", None)).order_by("sequence")
        else:
            documents = Sequence.objects.all().order_by("sequence")
        
        serializer = SequenceSerializer(documents, many=True)
        
        return Response({"objSequence": serializer.data})
    
    # CREATE
    # PARAMS: <string:sequence>
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        serializer = SequenceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> <string:sequence>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Update target document
        record = get_object_or_404(Sequence, pk=request.data.get("id"))
        serializer = SequenceSerializer(instance=record, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            Sequence.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)
    
class TypeAPI(generics.GenericAPIView):
    """
    Type REST API
    Use this to retreive documents from, or to perform CRUD tasks on the type collection
    Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/types
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents or by ID
        if not request.GET.get("id") == None:
            documents = Type.objects.filter(id=request.GET.get("id", None)).order_by("type")
        else:
            documents = Type.objects.all().order_by("type")
        
        serializer = TypeSerializer(documents, many=True)
        types = serializer.data
        
        # Retreive sequence data from connector tables
        for type in types:
            connectors = TypeSubpart.objects.filter(typeID=type["id"])
            subtypes = []
            
            for connector in connectors:
                subSerializer = TypeSubpartSerializer(connector)
                # subtypes.append({"id":subSerializer.data['id'], "subtype":subSerializer.data['subtype']})
                subtypes.append({"id":subSerializer.data['id'], "subtype":subSerializer.data['subtype']})
                
            type.update(subtypes=subtypes)
        
        return Response({"objType": serializer.data})
    
    # CREATE
    # PARAMS: <string:type> [array[string]:subtypes]
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        serializer = TypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        newRecord = serializer.save()
        
        if newRecord:
            # Parse and propagate many-many realtionships to subtype connector table
            subtypes = request.data.get("subtypes")
            # parsedSubtypes = []
            
            for i in subtypes:
                subtypeSerializer = TypeSubpartSerializer(data={"typeID" : newRecord.id, "subtype" : i})
                if subtypeSerializer.is_valid():
                    subtypeSerializer.save()
                # try:
                #     parsedSubtypes.append(i)
                # except Exception:
                #     continue
            
            # if len(parsedSubtypes) > 0:
            #     for i in parsedSubtypes:
            #         subtypeSerializer = TypeSubpartSerializer(data={"typeID" : newRecord.id, "subtype" : i})
            #         if subtypeSerializer.is_valid():
            #             subtypeSerializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> <string:type> [array[string]:subtypes]
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Update target document
        record = get_object_or_404(Type, pk=request.data.get("id"))
        serializer = TypeSerializer(instance=record, data=request.data)
        serializer.is_valid(raise_exception=True)
        newRecord = serializer.save()
        
        if newRecord:
            # Parse and propagate many-many realtionships to subtype connector table
            TypeSubpart.objects.filter(typeID=newRecord.id).delete()
            
            subtypes = request.data.get("subtypes")
            # parsedSubtypes = []
            
            for i in subtypes:
                subtypeSerializer = TypeSubpartSerializer(data={"typeID" : newRecord.id, "subtype" : i})
                if subtypeSerializer.is_valid():
                    subtypeSerializer.save()
                # try:
                #     parsedSubtypes.append(i["subtype"])
                # except Exception:
                #     continue
            
            # if len(parsedSubtypes) > 0:
            #     for i in parsedSubtypes:
            #         subtypeSerializer = TypeSubpartSerializer(data={"typeID" : newRecord.id, "subtype" : i})
            #         if subtypeSerializer.is_valid():
            #             subtypeSerializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            Type.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)
    
class ExamCodeAPI(generics.GenericAPIView):
    """
    Exam code REST API
    Use this to retreive documents from, or to perform CRUD tasks on the ExamCode collection
    Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/examcodes
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents or by ID
        if not request.GET.get("id") == None:
            documents = ExamCode.objects.filter(id=request.GET.get("id", None)).order_by("examCode")
        else:
            documents = ExamCode.objects.all().order_by("examCode")
        
        serializer = ExamCodeSerializer(documents, many=True)
        
        return Response({"objExamCode": serializer.data})
    
    # CREATE
    # PARAMS: <string:type>
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        serializer = ExamCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> <string:examCode>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Update target document
        record = get_object_or_404(ExamCode, pk=request.data.get("id"))
        serializer = ExamCodeSerializer(instance=record, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            ExamCode.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)