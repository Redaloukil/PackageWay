from django.contrib.auth.models import BaseUserManager


#MAKE NEW USER MANAGER RELATED TO USER MODEL 
class UserManager(BaseUserManager):
    def _create_user(self, username , first_name , last_name , user_type, password,
                     is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given phone number , email and password.
        """
        
        user = self.model(  username=username,
                            first_name=first_name, 
                            last_name=last_name,
                            user_type=user_type,
                            is_active=True,
                            is_superuser=is_superuser
                            ,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
        
    def _create_superuser(self,username , password , **extra_fields):
        """
        Creates and saves a User with the given phonenuumber email and password.
        """
        
        
        user = self.model(  username=username,
                            is_active=True,
                            is_staff=True,
                            is_superuser=True
                            ,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user  
    
    def create_user(self, username , first_name , last_name , user_type, password,**extra_fields):
        return self._create_user(username, first_name , last_name , user_type,
                    password, True , False,**extra_fields)
    # def create_superuser(self, phone_number, email,first_name , last_name , user_type, password, **extra_fields):
    #     return self._create_user(phone_number, email, first_name , last_name , user_type, password, True , True,
    #                              **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        return self._create_superuser(username, password,**extra_fields)
