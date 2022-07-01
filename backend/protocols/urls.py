from django.urls import path, include
from .api import ProtocolAPI, SequenceAPI, TypeAPI, ExamCodeAPI
from knox import views as knox_views
from . import views

#URLs for the protocol models.
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/protocols', ProtocolAPI.as_view()),
    path('api/auth/sequences', SequenceAPI.as_view()),
    path('api/auth/types', TypeAPI.as_view()),
    path('api/auth/examcodes', ExamCodeAPI.as_view())
]

