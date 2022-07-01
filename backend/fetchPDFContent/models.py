from django.db import models

# Create your models here.
class File(models.Model):
    filename = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads', max_length=255, blank=True)

    def __unicode__(self):
        return self.filename