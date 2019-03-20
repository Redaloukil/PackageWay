from django.urls import path
from .views import (
    UserView,
    SignupView ,
    LoginView,
    LogoutView,
    UserDetail

)

app_name = "users"

urlpatterns = [
    path('' , UserView.as_view()),
    path('<int:pk>/', UserDetail.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('signup/', SignupView.as_view()),


]
