from django.urls import path, include
from .api import SiteSettingsAPI
from knox import views as knox_views
from . import views

#URLs for the protocol models.
urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/sitesettings', SiteSettingsAPI.as_view()),
]

