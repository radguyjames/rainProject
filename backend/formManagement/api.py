from .models import RainForm, RainFormField, RainFormFieldValidationRule
from rest_framework import generics, permissions
from .serializers import RainFormSerializer, RainFormFieldSerializer, RainFormFieldValidationRuleSerializer
from rest_framework.response import Response

class rainFormAPI(generics.GenericAPIView):
    permissions_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = RainFormSerializer

    def post(self, request, *args, **kwargs):
        targetForm = request.data.get('formName')

        fetchedForm = RainForm.objects.get(strFormName=targetForm)

        return Response(RainFormSerializer(fetchedForm, context=self.get_serializer_context()).data)

# class rainFormFieldAPI(viewsets.ModelViewSet):
#     permissions_classes = [
#         permissions.IsAuthenticated
#     ]

#     queryset = RainFormField.objects.all()
#     serializer_class = RainFormFieldSerializer

# class RainFormFieldValidationRuleAPI(viewsets.ModelViewSet):
#     permissions_classes = [
#         permissions.IsAuthenticated
#     ]

#     queryset = RainFormFieldValidationRule.objects.all()
#     serializer_class = RainFormFieldValidationRuleSerializer