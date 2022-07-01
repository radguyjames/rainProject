from rest_framework import serializers
from .models import RainForm, RainFormField, RainFormFieldValidationRule

class RainFormFieldValidationRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RainFormFieldValidationRule
        fields = '__all__'

class RainFormFieldSerializer(serializers.ModelSerializer):   
    fieldrules = RainFormFieldValidationRuleSerializer(read_only=True)
    class Meta:
        model = RainFormField
        fields = '__all__'

class RainFormSerializer(serializers.ModelSerializer):
    formfield = RainFormFieldSerializer(read_only=True, many=True)
    class Meta:
        model = RainForm
        fields = '__all__'
