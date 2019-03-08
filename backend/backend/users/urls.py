from django.urls import path
from .views import (
    SignupView ,
    LoginView,
    LogoutView,
    UserDetail

)


app_name = "users"

urlpatterns = [
    path(r'^login/$', LoginView.as_view()),
    path(r'^logout/$', LogoutView.as_view()),
    path(r'^signup/$', SignupView.as_view()),
    path(r'^<int:pk>/$', UserDetail.as_view())
]
