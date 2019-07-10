import uuid
from django.contrib.auth.models import AbstractUser , PermissionsMixin
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from backend.users.managers import UserManager

USER_TYPE = (
    ("0" , "client"),
    ("1" , "delivery")
)

class User(AbstractUser):
    username = models.CharField(_("Name of User"), blank=True, max_length=255 , unique=True)
    first_name = models.CharField(max_length=255 , blank=False)
    last_name = models.CharField(max_length=255 , blank=False)
    user_type = models.CharField( choices=USER_TYPE ,max_length=10 ,default="0")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()
    
    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['first_name' , 'last_name',]

    class Meta:
        app_label = 'users'

    def __str__(self):
        return self.username

    def get_short_name(self):
        return self.username

    def get_full_name(self):
        return self.username + " " + self.first_name + " " + self.last_name

    def save(self, *args, **kwargs):
        if not self.password:
            self.password = str(uuid.uuid4()).replace('-', '')
        super(User, self).save(*args, **kwargs)


class Profile(models.Model):
    # image = models.ImageField(blank=True)
    user = models.ForeignKey(User , on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class ResetPasswordCode(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    code = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    class Meta:
        default_related_name = 'reset_password_codes'

    def __str__(self):
        return self.user.username + " " + self.code
