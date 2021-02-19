from django.db import models
from backend.general.models import BaseModel

# Create your models here.

class Help(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

