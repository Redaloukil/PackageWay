from django.urls import path
from django.urls import path , include 
from authentication import views
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [ 
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/' , views.SignupView.as_view()),
]