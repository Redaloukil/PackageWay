from django.urls import path
from .views import (
    ParcelsView,
    CreateParcelView,
)

app_name = "parcels"

urlpatterns = [
    path('' , ParcelsView.as_view()),
    path('create/' , CreateParcelView.as_view()),
]
