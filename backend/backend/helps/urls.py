from django.urls import path

from backend.helps.views import (
    CallView ,
    CallDetail ,
)

app_name = "calls"

urlpatterns = [
    path("calls/", view=CallView.as_view(), name="calls"),
]
