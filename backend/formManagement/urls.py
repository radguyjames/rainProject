from django.urls import path
from .api import rainFormAPI
from .views import ProtocolManagementRedirect
# , rainFormFieldAPI, RainFormFieldValidationRuleAPI

urlpatterns = [
    path('api/formmanagement/form', rainFormAPI.as_view()),
    # path('api/formmanagement/formfield', rainFormFieldAPI.as_view()),
    # path('api/formmanagement/formfieldrule', RainFormFieldValidationRuleAPI.as_view()),
    path('redirect/', ProtocolManagementRedirect),
]