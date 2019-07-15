from django.urls import path

from backend.users.views import (
    LoginView,
    LogoutView,
    UserView,
    UserDetail,
    GetCurrentUser,   
)

app_name = "users"

urlpatterns = [
    path("login/", view=LoginView.as_view(), name="login"),
    path("logout/", view=LogoutView.as_view(), name="logout"),
    path("", view=UserView.as_view(), name="users"),
    path("<int:id>/", view=UserDetail.as_view(), name="detail"),
    path("user/", view=GetCurrentUser.as_view(), name=""),
]
