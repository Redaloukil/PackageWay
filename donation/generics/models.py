from django.db import models


class BaseTimestamp(models.Model):
    created_date = models.DateTimeField(auto_now_add=True,auto_now=False)
    modified_date = models.DateTimeField(auto_now=True,auto_now_add=False)
    class Meta:
        abstract = True
    




