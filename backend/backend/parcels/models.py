from django.db import models
from ..users.models import User
# Create your models here.

class Parcel(models.Model):
    owner = models.ForeignKey(User , on_delete=models.CASCADE)
    longitude = models.FloatField(max_length=100)
    largitude = models.FloatField(max_length=100)
    title = models.CharField(max_length=255)
    content = models.TextField(max_length=250)
    recovered = models.BooleanField(default=False)


    def __str__(self):
        return self.largitude + " " + self.longitude


