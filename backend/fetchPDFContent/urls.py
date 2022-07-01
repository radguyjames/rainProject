from django.urls import path
from .api import FetchPDFContentAPI

urlpatterns = [
    path('api/file/fetchPDFContent', FetchPDFContentAPI.as_view()),
]
