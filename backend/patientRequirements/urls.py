from django.urls import path, include
from .api import MobilityRequirementAPI, SedationRequirementAPI, IsolationPrecautionAPI, PrecautionRequirementAPI
from knox import views as knox_views
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/mobilityrequirements', MobilityRequirementAPI.as_view()),
    path('api/auth/sedationrequirements', SedationRequirementAPI.as_view()),
    path('api/auth/isolationprecautions', IsolationPrecautionAPI.as_view()),
    path('api/auth/precautionrequirements', PrecautionRequirementAPI.as_view()),
]