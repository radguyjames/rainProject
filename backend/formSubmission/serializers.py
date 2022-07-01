from rest_framework import serializers
from .models import CustomRequisition, ScheduleProtocol, CalendarEvent, FinishProtocol, \
    ScheduleProtocolProtocolConnector, ScheduleProtocolSequenceConnector

# GetRequisition Serializer- ModelSerializer controls the transfer of JSON data
from ..patientRequirements.serializers import IsolationPrecautionSerializer, MobilityRequirementSerializer, \
    SedationRequirementSerializer
from ..protocols.models import ProtocolSequenceConnector
from ..protocols.serializers import TypeSerializer, TypeSubpartSerializer, ProtocolSerializer, \
    ProtocolSequenceConnectorSerializer, SequenceSerializer


class requisitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomRequisition
        fields = '__all__'

    # Create a new requisition from our data model                              None of the overrides in this class need to exist.
    def requisition(self):  # Someone didn't know what they were doing.
        CustomRequisition.objects.create()

    # Update a requisition instance and reserialize the data
    def update(self, instance, validated_data):
        instance.clinicalInformation = validated_data.get('clinicalInformation', instance.clinicalInformation)
        instance.urgency = validated_data.get('urgency', instance.urgency)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.dateCreated = validated_data.get('dateCreated', instance.dateCreated)
        instance.patientFirstName = validated_data.get('patientFirstName', instance.patientFirstName)
        instance.patientLastName = validated_data.get('patientLastName', instance.patientLastName)
        instance.phin = validated_data.get('phin', instance.phin)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.height = validated_data.get('height', instance.height)
        instance.ward = validated_data.get('ward', instance.ward)
        instance.anatomicalLocation = validated_data.get('anatomicalLocation', instance.anatomicalLocation)
        instance.subLocation = validated_data.get('subLocation', instance.subLocation)
        instance.clinician = validated_data.get('clinician', instance.clinician)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.feedback = validated_data.get('feedback', instance.feedback)
        instance.additionalComment = validated_data.get('additionalComments', instance.additionalComments)
        instance.isolationPrecaution = validated_data.get('isolationPrecaution', instance.isolationPrecaution)
        instance.mobilityRequirement = validated_data.get('mobilityRequirement', instance.mobilityRequirement)
        instance.sedationRequirement = validated_data.get('sedationRequirement', instance.sedationRequirement)
        instance.save()
        return instance

    def validate(self, data):
        # clean the data
        return data

    """
    Result: Overwrite to_representation method to retrieve foreign key data.
    Foreign Key: isolationPrecaution
                 mobilityRequirement
                 sedationRequirement
    How to Use: 1. Check which Model is the Foreign Key owner
                2. Select correct serializers
    Example:
        *** Model ***       -->     *** Serializer ***
        SuggestedProtocol   -->     SuggestedProtocolSerializer
        ScheduleProtocol    -->     ScheduleProtocolSerializer
        CustomRequisition   -->     requisitionSerializer
    Resource:
        #1: https://stackoverflow.com/questions/36189303/django-rest-framework-receive-primary-key-value-in-post-and-return-model-object
        #2: https://stackoverflow.com/questions/47962580/django-get-associated-data-one-to-one-field
    """

    def to_representation(self, instance):
        data = super(requisitionSerializer, self).to_representation(instance)
        data['anatomicalLocation'] = TypeSerializer(instance.anatomicalLocation).data
        data['subLocation'] = TypeSubpartSerializer(instance.subLocation).data
        data['mobilityRequirement'] = MobilityRequirementSerializer(instance.mobilityRequirement).data
        data['isolationPrecaution'] = IsolationPrecautionSerializer(instance.isolationPrecaution).data
        data['sedationRequirement'] = SedationRequirementSerializer(instance.sedationRequirement).data
        return data


class ScheduleProtocolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleProtocol
        fields = '__all__'

    # Create a new requisition from our data model
    def scheduleProtocol(self):
        ScheduleProtocol.objects.create()

    # Update and return an existing instance, given the validated data.
    def update(self, instance, validated_data):
        instance.suggestedProtocol = validated_data.get('suggestedProtocol', instance.suggestedProtocol)
        instance.timing = validated_data.get('timing', instance.timing)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.approvalLevel = validated_data.get('approvalLevel', instance.approvalLevel)
        instance.confidence = validated_data.get('confidence', instance.confidence)
        # instance.sequences = validated_data.get('sequences', instance.sequences)
        instance.customRequisition = validated_data.get('customRequisition', instance.customRequisition)
        instance.save()
        return instance

    def validate(self, data):
        # clean the data
        return data

    """
    Result: Overwrite to_representation method to retrieve foreign key data.
    Foreign Key: customRequisition
    How to Use: 1. Check which Model is the Foreign Key owner
                2. Select correct serializers
    Example:
        *** Model ***       -->     *** Serializer ***
        SuggestedProtocol   -->     SuggestedProtocolSerializer
        ScheduleProtocol    -->     ScheduleProtocolSerializer
        CustomRequisition   -->     requisitionSerializer
    Resource:
        #1: https://stackoverflow.com/questions/36189303/django-rest-framework-receive-primary-key-value-in-post-and-return-model-object
        #2: https://stackoverflow.com/questions/47962580/django-get-associated-data-one-to-one-field
    """

    def to_representation(self, instance):
        data = super(ScheduleProtocolSerializer, self).to_representation(instance)
        data['customRequisition'] = requisitionSerializer(instance.customRequisition).data
        suggestedProtocol = ScheduleProtocolProtocolConnector.objects.filter(ScheduleProtocolID=instance.id)
        data['suggestedProtocol'] = ScheduleProtocolProtocolConnectorSerializer(suggestedProtocol, many=True).data
        sequences = ScheduleProtocolSequenceConnector.objects.filter(scheduleProtocolID=instance.id)
        data['sequences'] = ScheduleProtocolSequenceConnectorSerializer(sequences, many=True).data
        # sequences = ProtocolSequenceConnector.objects.filter(ProtocolID=data['suggestedProtocol'])
        # data['suggestedProtocol'] = ProtocolSequenceConnectorSerializer(sequences, many=True).data
        return data


class ScheduleProtocolSequenceConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleProtocolSequenceConnector
        fields = '__all__'

    def to_representation(self, instance):
        data = super(ScheduleProtocolSequenceConnectorSerializer, self).to_representation(instance)
        data['sequenceID'] = SequenceSerializer(instance.sequenceID).data
        return data


class ScheduleProtocolProtocolConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleProtocolProtocolConnector
        fields = '__all__'

    def to_representation(self, instance):
        data = super(ScheduleProtocolProtocolConnectorSerializer, self).to_representation(instance)
        data['ProtocolID'] = ProtocolSerializer(instance.ProtocolID).data
        return data


class FinishProtocolSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinishProtocol
        fields = '__all__'

    # Create a new requisition from our data model
    def finishProtocol(self):
        FinishProtocol.objects.create()

    # Update and return an existing instance, given the validated data.
    def update(self, instance, validated_data):
        instance.finishProtocol = validated_data.get('finishProtocol', instance.finishProtocol)
        instance.suggestedProtocol = validated_data.get('suggestedProtocol', instance.suggestedProtocol)
        instance.timing = validated_data.get('timing', instance.timing)
        instance.approvalLevel = validated_data.get('approvalLevel', instance.approvalLevel)
        instance.confidence = validated_data.get('confidence', instance.confidence)
        instance.sequences = validated_data.get('sequences', instance.sequences)
        instance.clinicalInformation = validated_data.get('clinicalInformation', instance.clinicalInformation)
        instance.urgency = validated_data.get('urgency', instance.urgency)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.dateCreated = validated_data.get('dateCreated', instance.dateCreated)
        instance.patientFirstName = validated_data.get('patientFirstName', instance.patientFirstName)
        instance.patientLastName = validated_data.get('patientLastName', instance.patientLastName)
        instance.phin = validated_data.get('phin', instance.phin)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.height = validated_data.get('height', instance.height)
        instance.ward = validated_data.get('ward', instance.ward)
        instance.anatomicalLocation = validated_data.get('anatomicalLocation', instance.anatomicalLocation)
        instance.subLocation = validated_data.get('subLocation', instance.subLocation)
        instance.clinician = validated_data.get('clinician', instance.clinician)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.feedback = validated_data.get('feedback', instance.feedback)
        instance.additionalComment = validated_data.get('additionalComments', instance.additionalComments)
        instance.save()
        return instance

    def validate(self, data):
        # clean the data
        return data


class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = '__all__'

    """
    Result: Overwrite to_representation method to retrieve foreign key data.
    Foreign Key: scheduleProtocol
    How to Use: 1. Check which Model is the Foreign Key owner
                2. Select correct serializers
    Example:
        *** Model ***       -->     *** Serializer ***
        SuggestedProtocol   -->     SuggestedProtocolSerializer
        ScheduleProtocol    -->     ScheduleProtocolSerializer
        CustomRequisition   -->     requisitionSerializer
    Resource:
        #1: https://stackoverflow.com/questions/36189303/django-rest-framework-receive-primary-key-value-in-post-and-return-model-object
        #2: https://stackoverflow.com/questions/47962580/django-get-associated-data-one-to-one-field
    """

    def to_representation(self, instance):
        data = super(CalendarEventSerializer, self).to_representation(instance)
        data['scheduleProtocol'] = ScheduleProtocolSerializer(instance.scheduleProtocol).data
        return data


class CalendarEventDTPreSerializer(serializers.Serializer):
    startDateTime = serializers.DateTimeField(required=True)
    timing = serializers.IntegerField(required=True)
    scanner = serializers.IntegerField(required=True)


class CalendarEventUpdateSerializer(serializers.Serializer):
    scheduleProtocol = serializers.IntegerField(required=True)
    startDateTime = serializers.DateTimeField(required=True)
    timing = serializers.IntegerField(required=True)


class CalendarEventIdSerializer(serializers.Serializer):
    calendarEvent_id = serializers.IntegerField(required=True)


class CalendarEventEarlyCompleteSerializer(serializers.Serializer):
    calendarEvent_id = serializers.IntegerField(required=True)
    earlyComplete = serializers.BooleanField(required=True)


class ScheduleProtocolIdSerializer(serializers.Serializer):
    scheduleProtocol_id = serializers.IntegerField(required=True)
