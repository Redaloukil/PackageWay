from django.db import models
from ..users.models import User
# Create your models here.

class Client(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)


    def __str__(self):
        return 0
