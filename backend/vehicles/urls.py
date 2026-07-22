from django.urls import path
from .views import VehicleListCreateView, VehicleDetailView

from .views import PurchaseVehicleView,RestockVehicleView, VehicleSearchView

urlpatterns = [
    path("", VehicleListCreateView.as_view(), name="vehicle-list"),
    path("<int:pk>/", VehicleDetailView.as_view(), name="vehicle-detail"),
    path(
        "<int:pk>/purchase/",
        PurchaseVehicleView.as_view(),
        name="purchase",
    ),
    path(
    "<int:pk>/restock/",
    RestockVehicleView.as_view(),
    name="restock",
    ),

    path(
        "search/",
        VehicleSearchView.as_view(),
        name="vehicle-search"
    ),
]