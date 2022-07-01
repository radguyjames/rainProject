from django.urls import path, include
from .api import registerAPI, loginAPI, getUsernameExistsAPI, userManagementAPI, ldapLoginAPI
from knox import views as knox_views
# from rest_framework import routers

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/getusernameexists', getUsernameExistsAPI.as_view()),
    path('api/auth/register', registerAPI.as_view()),
    path('api/auth/login', loginAPI.as_view()),
    path('api/auth/ldaplogin', ldapLoginAPI.as_view()),
    path('api/auth/usermanagement', userManagementAPI.as_view()),
    path('api/auth/signout', knox_views.LogoutView.as_view()),
]
