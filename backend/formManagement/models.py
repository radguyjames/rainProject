from django.db import models

# Create your models here.
class RainForm(models.Model):
    strFormName = models.CharField(max_length=200)
    strModality = models.CharField(max_length=200)
    boolEnabled = models.BooleanField()
    dateCreated_at = models.DateTimeField(auto_now_add=True)

class RainFormField(models.Model):
    strFieldName = models.CharField(max_length=200)
    strFieldValue = models.CharField(max_length=2000, blank=True)
    objAssociatedForm = models.ForeignKey(RainForm, related_name="formfield", on_delete=models.CASCADE)

class RainFormFieldValidationRule(models.Model):
    boolRequired = models.BooleanField()
    boolAttachmentSupported = models.BooleanField()
    boolAttachmentRequired = models.BooleanField()
    boolBypassAllowed = models.BooleanField()
    objFieldRules = models.OneToOneField(RainFormField, related_name="fieldrules", on_delete=models.CASCADE)

