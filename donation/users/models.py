from django.db import models
from generics.models import BaseTimestamp
from django.contrib.auth.models import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from users.managers import UserManager

class User(AbstractBaseUser):
    email = models.EmailField(_('Email'),max_length=255,unique=True , blank=False)
    first_name = models.CharField(_('First name'),max_length=255,blank=True)
    last_name = models.CharField(_('Last name'),max_length=255,blank=True)
    password = models.CharField(_('Password'),max_length=255,blank=False)

    REQUIRED_FIELDS = ['password']

    USERNAME_FIELD = 'email'
    objects = UserManager()
    
    def __str__(self):
        return self.email + ' ' + self.first_name + ' ' + self.last_name
    class Meta:
        app_label = 'users'
    
