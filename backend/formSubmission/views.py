from django.shortcuts import render, HttpResponseRedirect, redirect
from django.http import HttpResponse

# Create your views here.
def protocolManagementView():
    return redirect('http://127.0.0.1:8000/#/apps/protocolmanagement')
