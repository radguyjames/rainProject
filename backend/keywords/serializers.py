from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Keyword
from ..protocols.serializers import TypeSerializer

class KeywordSerializer(serializers.ModelSerializer):
    typeString = serializers.StringRelatedField(source='type.type', read_only=True)
    
    class Meta:
        model = Keyword
        fields = '__all__'
        
    # def to_representation(self, instance):
    #      data = super(KeywordSerializer, self).to_representation(instance)
    #      data['type'] = TypeSerializer(instance.type).data
    #      return data