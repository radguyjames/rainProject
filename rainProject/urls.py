from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('backend.registrationAndAuthentication.urls')),
    path('', include('backend.formManagement.urls')),
    path('', include('backend.fetchPDFContent.urls')),
    path('', include('backend.protocols.urls')),
    path('', include('backend.formSubmission.urls')),
    path('', include('backend.keywords.urls')),
    path('', include('backend.siteManagement.urls')),
    path('', include('backend.patientRequirements.urls')),
]