from rest_framework import serializers
from .models import RainUser
from django.contrib.auth import authenticate

# GetUsernameExists Serializer
class getUsernameExistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RainUser
        fields = ['username', 'role', 'site', 'department']

# Register Serializer
class registerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RainUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
    
    def register(self, validated_date):
        newUser = RainUser.objects.create_user(validated_date['username'], validated_date['password'])

        return newUser

# Login Serializer
class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = RainUser
        fields = '__all__'

