from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from .manager import UserManager
from django.utils.translation import ugettext_lazy as _

USER_TYPE = (
    ("0" , "client"),
    ("1" , "delivery"),
)

class User(AbstractUser):
    username = models.CharField(max_length=255 , unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    user_type = models.CharField(choices=USER_TYPE , max_length=10)

    USERNAME_FIELD = "username"

    objects = UserManager

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class ResetPasswordCode(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    code = models.CharField(max_length=255)



