from django.db import models

# Create your models here.
class Keyword(models.Model):
    keyword = models.CharField(max_length=200)
    points = models.IntegerField(default=0)
    type = models.ForeignKey("protocols.Type", blank=False, null=False, on_delete=models.PROTECT)
    
    class Meta:
        unique_together = [["keyword", "points", "type"]]