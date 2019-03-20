from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def _create_user(self, username, first_name, last_name, user_type, password,
                     is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given phone number , email and password.
        """
        now = timezone.now()

        user = self.model(username=username,
                          first_name=first_name,
                          last_name=last_name,
                          user_type=user_type,
                          is_active=True,
                          is_superuser=is_superuser
                          , **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def _create_superuser(self, username, password,
                          is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given phonenuumber email and password.
        """
        now = timezone.now()
        user = self.model(username,
                          is_active=True,
                          is_superuser=is_superuser
                          , **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username , first_name, last_name, user_type, password, **extra_fields):
        return self._create_user(username, first_name, last_name, user_type,
                                 password, True, False, **extra_fields)

    def create_superuser(self, phone_number, email, password, **extra_fields):
        return self._create_superuser(phone_number, email, password, True, True,
                                      **extra_fields)
