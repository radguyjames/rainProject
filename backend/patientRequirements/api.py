from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from pymongo import MongoClient
from .models import MobilityRequirement, SedationRequirement, IsolationPrecaution, PrecautionRequirement, IsolationRequirementConnector
from .serializers import MobilityRequirementSerializer, SedationRequirementSerializer, IsolationPrecautionSerializer, PrecautionRequirementSerializer, IsolationRequirementConnectorSerializer
from django.http import QueryDict
from django.shortcuts import get_object_or_404


class MobilityRequirementAPI(generics.GenericAPIView):
    """
    MobilityRequirement REST API
    Use this to retreive documents from, or to perform CRUD tasks on the MobilityRequirements collection
    Access GET, POST, PUT, DELETE at: http://127.0.0.1:8000/api/auth/mobilityrequirements
    """
    
    # GET
    # PARAMS: [int:id] [string:search]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents, by ID, or by search term
        if not request.GET.get("id") == None:
            documents = MobilityRequirement.objects.filter(id=request.GET.get("id", None)).order_by("id")
        elif not request.GET.get("search") == None:
            documents = MobilityRequirement.objects.filter(mobilityRequirement__icontains=request.GET.get("search", None)).order_by("mobilityRequirement")
        else:
            documents = MobilityRequirement.objects.all().order_by("mobilityRequirement")
        
        serializer = MobilityRequirementSerializer(documents, many=True)
        
        return Response({"objMobilityRequirements": serializer.data})
    
    # CREATE
    # PARAMS: <string:mobilityRequirement>
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        serializer = MobilityRequirementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
    
    # UPDATE
    # PARAMS: <int:id> <string:mobilityRequirement>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        record = get_object_or_404(MobilityRequirement, pk=request.data.get("id"))
        serializer = MobilityRequirementSerializer(instance=record, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            MobilityRequirement.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)
    
class SedationRequirementAPI(generics.GenericAPIView):
    """
    SedationRequirement REST API
    Use this to retreive documents from, or to perform CRUD tasks on the SedationRequirements collection
    Access GET, POST, PUT at: http://127.0.0.1:8000/api/auth/sedationrequirements
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents if id is not set or 1 if id is set
        if(request.GET.get("id") == None):
            documents = SedationRequirement.objects.all().order_by("sedationRequirement")
        else:
            documents = SedationRequirement.objects.filter(id=request.GET.get("id", None)).order_by("sedationRequirement")
        
        serializer = SedationRequirementSerializer(documents, many=True)
        
        return Response({"objSedationRequirements": serializer.data})
    
    # CREATE
    # PARAMS: <string:sedationRequirement> [string:message]
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        serializer = SedationRequirementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> <[string:sedationRequirement] [string:message]>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Validate incoming data
        record = get_object_or_404(SedationRequirement, pk=request.data.get("id"))
        serializer = SedationRequirementSerializer(instance=record, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_200_OK)
        
    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            SedationRequirement.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)
    
class IsolationPrecautionAPI(generics.GenericAPIView):
    """
    IsolationPrecaution REST API
    Use this to retreive documents from, or to perform CRUD tasks on the IsolationPrecaution collection
    Access GET, POST, PUT at: http://127.0.0.1:8000/api/auth/isolationprecautions
    """
    
    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents if id is not set or 1 if id is set
        if(request.GET.get("id") == None):
            documents = IsolationPrecaution.objects.all().order_by("isolationPrecaution")
        else:
            documents = IsolationPrecaution.objects.filter(id=request.GET.get("id", None)).order_by("isolationPrecaution")
        
        isolationSerializer = IsolationPrecautionSerializer(documents, many=True)
        isolationPrecautions = isolationSerializer.data

        
        #Retrieve precaution requirement data from connector table
        for isolationPrecaution in isolationPrecautions:
            connectors = IsolationRequirementConnector.objects.filter(precautionID=isolationPrecaution["id"])
            requirements = []

            for connector in connectors:
                requirements.append({"id":connector.requirementID.id, "precaution":connector.requirementID.precaution})

            isolationPrecaution.update(requirements=requirements)

        return Response({"objIsolationPrecaution": isolationPrecautions})
    
    # CREATE
    # PARAMS: <string:isolationPrecaution>
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        createSerializer = IsolationPrecautionSerializer(data=request.data)
        createSerializer.is_valid(raise_exception=True)
        newRequirement = createSerializer.save()

        # Mongo is not meant to work with Django, and Djongo just doesn't work, so adding FK arrays is extremly difficult.
        # This code handles the many-many relationships manualy, but in a way that is still transparent to the frontend.
        # It will also parse out bad input automatically and should never throw HTTP exceptions.
        if newRequirement:

            # Parse and propagate many-many realtionships to Isolation Precaution connector table
            requirements = request.data.get("requirements")
            parsedPrecautionID = []

            for i in requirements:
                try:
                    parsedPrecautionID.append(i["id"])
                except Exception:
                    continue

            if len(parsedPrecautionID) > 0:
                for i in parsedPrecautionID:
                    precautionSerializer = IsolationRequirementConnectorSerializer(data={"precautionID":newRequirement.id, "requirementID": i })
                    if precautionSerializer.is_valid():
                        precautionSerializer.save()
        return Response(status=status.HTTP_201_CREATED)

        # # Validate incoming data
        # serializer = IsolationPrecautionSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
            
        # return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> <string:isolationPrecaution>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Validate incoming data
        record = get_object_or_404(IsolationPrecaution, pk=request.data.get("id"))
        serializer = IsolationPrecautionSerializer(instance=record, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        newRequirement = serializer.save()

        if newRequirement:  
            IsolationRequirementConnector.objects.filter(precautionID=newRequirement.id).delete()

            # Parse and propagate many-many realtionships to sequence connector table
            precautions = request.data.get("requirements")
            parsedRequirementID = []

            for i in precautions:
                try:
                    parsedRequirementID.append(i["id"])
                except Exception:
                    continue

            if len(parsedRequirementID) > 0:
                for i in parsedRequirementID:
                    precautionSerializer = IsolationRequirementConnectorSerializer(data={"precautionID":newRequirement.id, "requirementID": i })
                    if precautionSerializer.is_valid():
                        precautionSerializer.save()

        return Response(status=status.HTTP_200_OK)

    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            IsolationPrecaution.objects.get(id=request.query_params.get("id")).delete()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)

class PrecautionRequirementAPI(generics.GenericAPIView):
    """
    PrecautionRequirement REST API
    Use this to retreive documents from, or to perform CRUD tasks on the precautionRequirement collection
    Access GET, POST, PUT at: http://127.0.0.1:8000/api/auth/precautionrequirements
    """

    # GET
    # PARAMS: [int:id]
    # RETURN: HTTP response object
    def get(self, request, *args, **kwargs):
        # Get all documents if id is not set or 1 if id is set
        if(request.GET.get("id") == None):
            documents = PrecautionRequirement.objects.all().order_by("precaution")
        else:
            documents = PrecautionRequirement.objects.filter(id=request.GET.get("id", None)).order_by("precaution")
        
        serializer = PrecautionRequirementSerializer(documents, many=True)
        
        return Response({"objPrecautionRequirement": serializer.data})

         # CREATE
    # PARAMS: <string:precautionRequirement>
    # RETURN: 201 CREATED, 400 BAD REQUEST
    def post(self, request, *args, **kwargs):
        # Validate incoming data
        
        serializer = PrecautionRequirementSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)
        
    # UPDATE
    # PARAMS: <int:id> <string:precautionRequirement>
    # RETURN: 200 OK, 400 BAD REQUEST
    def put(self, request, *args, **kwargs):
        # Validate incoming data
        record = get_object_or_404(PrecautionRequirement, pk=request.data.get("id"))
        serializer = PrecautionRequirementSerializer(instance=record, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_200_OK)

    # DELETE
    # PARAMS: <int:id>
    # RETURN: 200 OK, 400 BAD REQUEST
    def delete(self, request, *args, **kwargs):
        # Delete target document
        try:
            PrecautionRequirement.objects.get(id=request.query_params.get("id")).delete()
            
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)