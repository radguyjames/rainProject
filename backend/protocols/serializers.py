from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import ExamCode, ProtocolSequenceConnector, ProtocolKeywordConnector, ProtocolExamCodeConnector, Protocol, Sequence, Type, TypeSubpart


class ProtocolSerializer(serializers.ModelSerializer):
    typeString = serializers.StringRelatedField(source='type.type', read_only=True)

    class Meta:
        model = Protocol
        fields = '__all__'


class ProtocolSequenceConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProtocolSequenceConnector
        fields = '__all__'

    """
    Result: Overwrite to_representation method to retrieve foreign key data.
    Foreign Key: protocolID
                 sequenceID
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
        data = super(ProtocolSequenceConnectorSerializer, self).to_representation(instance)
        data['protocolID'] = ProtocolSerializer(instance.protocolID).data
        data['sequenceID'] = SequenceSerializer(instance.sequenceID).data
        return data


class ProtocolKeywordConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProtocolKeywordConnector
        fields = '__all__'


class ProtocolExamCodeConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProtocolExamCodeConnector
        fields = '__all__'


class SequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sequence
        fields = '__all__'


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'


class TypeSubpartSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeSubpart
        fields = '__all__'


class ExamCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamCode
        fields = '__all__'