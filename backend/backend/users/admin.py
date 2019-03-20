from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

#from backend.users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


admin.site.register(User)
#class UserAdmin(auth_admin.UserAdmin):

#    form = UserChangeForm
#    add_form = UserCreationForm
    #fieldsets = (("User", {"fields": ("username",)}),) + auth_admin.UserAdmin.fieldsets
    #list_display = ["username", "is_superuser"]
    #search_fields = ["username"]
