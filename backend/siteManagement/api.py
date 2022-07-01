from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import SiteSettingsSerializer
from .models import SiteSettings

class SiteSettingsAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = SiteSettingsSerializer

    def get(self, request):
        settings = SiteSettings.objects.first()
        serializer = self.get_serializer(settings)
        return Response({
            "settings": serializer.data
        })
    
    def post(self, request):
        id = request.data.get('id')
        settings = SiteSettings.objects.get(id=id)
        
        data = request.data
        serializer = SiteSettingsSerializer(
            instance=settings, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response("Settings have been saved.")
