from django.urls import path, include
from .api import KeywordAPI
from knox import views as knox_views
from . import views

#URLs for the protocol models.
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/keywords', KeywordAPI.as_view())
]