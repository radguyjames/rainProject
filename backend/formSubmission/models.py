from django.db import models
from django.core.validators import validate_comma_separated_integer_list


# Model to represent the MRI requisition form
class CustomRequisition(models.Model):
    clinicalInformation = models.CharField(max_length=1500, blank=True)
    urgency = models.IntegerField(validators=[validate_comma_separated_integer_list], blank=False, default=4)
    priority = models.IntegerField(validators=[validate_comma_separated_integer_list], blank=False, default=10)
    dateCreated = models.DateTimeField(auto_now_add=True)
    patientFirstName = models.CharField(max_length=50, blank=False)
    patientLastName = models.CharField(max_length=50, blank=False)
    phin = models.CharField(max_length=9, blank=False)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    height = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    ward = models.CharField(max_length=100, blank=False, default="")
    clinician = models.CharField(max_length=50, blank=False, default='Doctor')
    gender = models.CharField(max_length=10, blank=False, default='male')
    dob = models.DateField(blank=False, default='2000-12-12')
    feedback = models.CharField(max_length=1500, blank=True)
    additionalComments = models.CharField(max_length=1500, blank=True)
    anatomicalLocation = models.ForeignKey("protocols.Type", on_delete=models.PROTECT, null=False, blank=False)
    subLocation = models.ForeignKey("protocols.TypeSubpart", on_delete=models.PROTECT, null=False, blank=False)
    isolationPrecaution = models.ForeignKey("patientRequirements.IsolationPrecaution", on_delete=models.PROTECT,
                                            null=True, blank=True)
    mobilityRequirement = models.ForeignKey("patientRequirements.MobilityRequirement", on_delete=models.PROTECT,
                                            null=True, blank=True)
    sedationRequirement = models.ForeignKey("patientRequirements.SedationRequirement", on_delete=models.PROTECT,
                                            null=True, blank=True)


class ScheduleProtocol(models.Model):
    suggestedProtocol = models.CharField(max_length=1500, blank=True)
    timing = models.IntegerField(blank=True)
    approvalLevel = models.CharField(max_length=200, blank=False)
    confidence = models.FloatField(blank=True, default=0)
    sequences = models.CharField(max_length=1500, blank=True)
    customRequisition = models.OneToOneField("CustomRequisition", blank=False, on_delete=models.PROTECT)


class ScheduleProtocolSequenceConnector(models.Model):
    scheduleProtocolID = models.ForeignKey("ScheduleProtocol", null=False, blank=False, on_delete=models.CASCADE)
    sequenceID = models.ForeignKey("protocols.Sequence", null=False, blank=False, on_delete=models.CASCADE)


class ScheduleProtocolProtocolConnector(models.Model):
    ScheduleProtocolID = models.ForeignKey("ScheduleProtocol", null=False, blank=False, on_delete=models.CASCADE)
    ProtocolID = models.ForeignKey("protocols.Protocol", null=False, blank=False, on_delete=models.CASCADE)


class CalendarEvent(models.Model):
    startDateTime = models.DateTimeField(blank=False)
    endDateTime = models.DateTimeField(blank=False)
    scheduleProtocol = models.OneToOneField("ScheduleProtocol", blank=False, on_delete=models.CASCADE)
    earlyComplete = models.BooleanField(blank=True, default=False)
    scanner = models.IntegerField(blank=False, default=1)


class FinishProtocol(models.Model):
    startDateTime = models.DateTimeField(blank=False)
    endDateTime = models.DateTimeField(blank=False)
    suggestedProtocol = models.CharField(max_length=1500, blank=False)
    timing = models.IntegerField(blank=True)
    approvalLevel = models.CharField(max_length=200, blank=False)
    confidence = models.FloatField(blank=True, default=0)
    sequences = models.CharField(max_length=1500, blank=True, default='')
    clinicalInformation = models.CharField(max_length=1500, blank=True)
    urgency = models.IntegerField(validators=[validate_comma_separated_integer_list], blank=False)
    priority = models.IntegerField(validators=[validate_comma_separated_integer_list], blank=False)
    dateCreated = models.DateTimeField(auto_now_add=False)
    patientFirstName = models.CharField(max_length=50, blank=False)
    patientLastName = models.CharField(max_length=50, blank=False)
    phin = models.CharField(max_length=9, blank=False)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    height = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    ward = models.CharField(max_length=100, blank=False, default="")
    anatomicalLocation = models.CharField(max_length=20, blank=False)
    subLocation = models.CharField(max_length=20, blank=False)
    clinician = models.CharField(max_length=50, blank=False, default='Doctor')
    gender = models.CharField(max_length=10, blank=False, default='male')
    dob = models.DateField(blank=False, default='2000-12-12')
    feedback = models.CharField(max_length=1500, blank=True)
    additionalComments = models.CharField(max_length=1500, blank=True)
    isolationPrecaution = models.CharField(max_length=200, blank=True)
    mobilityRequirement = models.CharField(max_length=200, blank=True)
    sedationRequirement = models.CharField(max_length=200, blank=True)
    sedationRequirement_message = models.CharField(max_length=1500, blank=True)
    deniedMessage = models.CharField(max_length=1500, blank=True)


class sortParam(models.Model):
    username = models.CharField(max_length=200, blank=False, default="")
    sortParam = models.CharField(max_length=50, blank=False, default="")
