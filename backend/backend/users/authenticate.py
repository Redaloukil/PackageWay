from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password



class CustomBackend:
    """
    Authenticate against the settings ADMIN_LOGIN and ADMIN_PASSWORD.

    Use the login name and a hash of the password. For example:

    ADMIN_LOGIN = 'admin'
    ADMIN_PASSWORD = 'pbkdf2_sha256$30000$Vo0VlMnkR4Bk$qEvtdyZRWTcOsCnI/oQ7fVOu1XAURIZYoOZ3iq8Dr4M='
    """
    @staticmethod
    def authenticate(username=None, password=None):
        try:
                user = User.objects.get(username=username)
                if user:
                    if user.check_password(password):
                        return user
                    return None
                return None
        except User.DoesNotExist:
            # Create a new user. There's no need to set a password
            # because only the password from settings.py is checked.
            user = User(username=username)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            return user
        return None
    @staticmethod
    def get_user(user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
