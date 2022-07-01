from django.db import models
from django.core.exceptions import FieldDoesNotExist


# Create your models here.
class Protocol(models.Model):
    protocol = models.CharField(max_length=200)
    examTime = models.IntegerField(default=0, blank=True)
    type = models.ForeignKey("Type", blank=False, null=False, on_delete=models.PROTECT)

    class Meta:
        unique_together = [["protocol", "type", "examTime"]]


class Sequence(models.Model):
    sequence = models.CharField(max_length=200, unique=True)


class ExamCode(models.Model):
    examCode = models.CharField(max_length=50, blank=False, unique=True)


class Type(models.Model):
    type = models.CharField(max_length=50, blank=False, unique=True)


class ProtocolSequenceConnector(models.Model):
    protocolID = models.ForeignKey("Protocol", blank=False, null=False, on_delete=models.CASCADE)
    sequenceID = models.ForeignKey("Sequence", blank=False, null=False, on_delete=models.CASCADE)


class ProtocolKeywordConnector(models.Model):
    protocolID = models.ForeignKey("Protocol", blank=False, null=False, on_delete=models.CASCADE)
    keywordID = models.ForeignKey("keywords.Keyword", blank=False, null=False, on_delete=models.CASCADE)


class ProtocolExamCodeConnector(models.Model):
    protocolID = models.ForeignKey("Protocol", blank=False, null=False, on_delete=models.CASCADE)
    examCodeID = models.ForeignKey("ExamCode", blank=False, null=False, on_delete=models.CASCADE)


class TypeSubpart(models.Model):
    typeID = models.ForeignKey("Type", blank=False, null=False, on_delete=models.CASCADE)
    subtype = models.CharField(blank=False, max_length=50)