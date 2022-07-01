from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.
def ProtocolManagementRedirect(request):
    return redirect('http://127.0.0.1:8000/#/apps/protocolmanagement')