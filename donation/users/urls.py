from django.urls import path , include 
from users import views

urlpatterns = [
    path('' , views.UsersView.as_view()),
    path('<int:id>/',views.UserView.as_view()) 
]
