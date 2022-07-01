from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import SiteSettings

class SiteSettingsSerializer(serializers.ModelSerializer):    
    class Meta:
        model = SiteSettings
        fields = '__all__'
    
    LDAPServerAddress = serializers.CharField(max_length=200)
    LDAPUserDirectory = serializers.CharField(max_length=500)


