from django.db import models
from generics.models import BaseTimestamp
from users import models

# Create your models here.

class Posts(BaseTimestamp):
    title = models.CharField(max_length=500,  blank=False)
    body = models.TextField()
    author = models.OneToOneField(models.User,on_delete=models.CASCADE, primary_key=True)


        