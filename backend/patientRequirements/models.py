from django.db import models                                                                                                                                 
class MobilityRequirement(models.Model):
    mobilityRequirement = models.CharField(max_length=200, blank=False, unique=True)
    
class SedationRequirement(models.Model):
    sedationRequirement = models.CharField(max_length=200, blank=False, unique=True)
    message = models.CharField(max_length=1500, blank=True)
    
class IsolationPrecaution(models.Model):
    isolationPrecaution = models.CharField(max_length=200, blank=False, unique=True)

class PrecautionRequirement(models.Model):
    precaution = models.CharField(max_length=200, blank=False, unique=True)

class IsolationRequirementConnector(models.Model):
    precautionID = models.ForeignKey("IsolationPrecaution", blank=False, null=False, on_delete=models.CASCADE)
    requirementID = models.ForeignKey("PrecautionRequirement", blank=False, null=False, on_delete=models.CASCADE)
