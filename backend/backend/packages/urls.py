from django.urls import path

from backend.packages.views import (
    PackageView,
    PackageDetail,
    PackagesCurrentUserView,
)

app_name = "packages"

urlpatterns = [
    path("", view=PackageView.as_view(), name="login"),
    path("user/", view=PackagesCurrentUserView.as_view(), name="logout"),
    
    path("<int:id>/", view=PackageDetail.as_view(), name="detail"),
]
