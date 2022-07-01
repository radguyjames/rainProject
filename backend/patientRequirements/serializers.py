from rest_framework import serializers
from .models import MobilityRequirement, SedationRequirement, IsolationPrecaution, PrecautionRequirement, IsolationRequirementConnector


# Validate MobilityRequirement fields according to model definition
class MobilityRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobilityRequirement
        fields = '__all__'


# Validate SedationRequirement fields according to model definition
class SedationRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = SedationRequirement
        fields = '__all__'


# Validate IsolationPrecautions fields against model
class IsolationPrecautionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IsolationPrecaution
        fields = '__all__'


class PrecautionRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecautionRequirement
        fields = '__all__'

class IsolationRequirementConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = IsolationRequirementConnector
        fields = '__all__'
