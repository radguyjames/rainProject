from django.db import models

# Create your models here.
class SiteSettings(models.Model):
    LDAPServerAddress = models.CharField(max_length=200)
    LDAPUserDirectory = models.CharField(max_length=500)
