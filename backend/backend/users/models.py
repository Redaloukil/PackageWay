from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    username = models.CharField()
    first_name = models.CharField()
    last_name = models.CharField()
    

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
