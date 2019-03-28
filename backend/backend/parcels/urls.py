from django.urls import path
from .views import (
    ParcelsView,
    CreateParcelView,
    ParcelPerUserView,
    UpdateParcelView
)

app_name = "parcels"

urlpatterns = [
    path('' , ParcelsView.as_view()),
    path('create/' , CreateParcelView.as_view()),
    path('user/' , CreateParcelView.as_view()),
    path('<int:pk>/' , CreateParcelView.as_view()),
    
]
