from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from pymongo import MongoClient
from django.shortcuts import get_object_or_404
from .models import Keyword
from .serializers import KeywordSerializer


class KeywordAPI(generics.GenericAPIView):
    """
    Keyword REST API
    Use this to retreive documents from, or to perform CRUD tasks on the keyword collection
    Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/keywords
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents, by ID, or by search term
        if not request.GET.get("id") == None:
            documents = Keyword.objects.filter(id=request.GET.get("id", None)).order_by("keyword")
        else:
            documents = Keyword.objects.all().order_by("keyword")
        
        serializer = KeywordSerializer(documents, many=True)
        
        return Response({"objKeywords": serializer.data})
    
    # CREATE
    # PARAMS: <string:keyword> [int:points]
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        serializer = KeywordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> [string:keyword] [int:points]
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Update target document
        record = get_object_or_404(Keyword, pk=request.data.get("id"))
        serializer = KeywordSerializer(instance=record, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            Keyword.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)