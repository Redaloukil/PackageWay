from django.urls import path

from backend.packages.views import (
    PackageView,
    PackageDetail,
    PackagesCurrentUserView,
    PackagesRecoveredCurrentUserView ,
    PackagesNotRecoveredCurrentUserView ,
    PackagesNotRecoveredPerWilaya,
)

app_name = "packages"

urlpatterns = [
    path("", view=PackageView.as_view(), name="packages_list"),
    path("<int:id>/", view=PackageDetail.as_view(), name="delete_package"),
    path("<str:wilaya>/", view=PackagesNotRecoveredPerWilaya.as_view(), name="notrecovered_wilaya"),
    path("user/", view=PackagesNotRecoveredCurrentUserView.as_view(), name="packages_list_user"),
    path("user/recovered/", view=PackagesRecoveredCurrentUserView.as_view(), name="packages_list_user"),
    path("user/notrecovered/", view=PackagesNotRecoveredCurrentUserView.as_view(), name="packages_list_user"),
    
    
]
