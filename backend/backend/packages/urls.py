from django.urls import path

from backend.packages.views import (
    PackageView,
    PackageDetail,
    PackagesCurrentUserView,
    PackagesRecoveredCurrentUserView ,
    PackagesNotRecoveredCurrentUserView ,
)

app_name = "packages"

urlpatterns = [
    path("", view=PackageView.as_view(), name="packages_list"),
    path("<int:id>/", view=PackageDetail.as_view(), name="delete_package"),
    path("user/", view=PackagesCurrentUserView.as_view(), name="packages_list_user"),
    path("user/recovered/", view=PackagesRecoveredCurrentUserView.as_view(), name="packages_list_user"),
    path("user/notrecovered/", view=PackagesNotRecoveredCurrentUserView.as_view(), name="packages_list_user"),
    
    
]
