from django.db import models
from ..users.models import User

# Create your models here.

class Delivery(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    largitude = models.FloatField(max_length=255)
    longitude = models.FloatField(max_length=255)

    
    