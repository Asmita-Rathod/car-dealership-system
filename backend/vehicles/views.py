from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsAdminUserRole, IsCustomerUserRole
from django_filters.rest_framework import DjangoFilterBackend

from .models import Vehicle
from .serializers import VehicleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Purchase
from accounts.models import User
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


from rest_framework.generics import ListAPIView
class VehicleListCreateView(generics.ListCreateAPIView):

    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "make",
        "model",
        "category",
    ]

    search_fields = [
        "make",
        "model",
        "category",
    ]

    ordering_fields = [
        "price",
    ]


    def get_permissions(self):

        if self.request.method == "POST":
            return [IsAdminUserRole()]

        return [AllowAny()]

class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


    def get_permissions(self):

        if self.request.method in [
            "PUT",
            "PATCH",
            "DELETE"
        ]:
            return [IsAdminUserRole()]

        return [AllowAny()]

class PurchaseVehicleView(APIView):

    permission_classes = [IsCustomerUserRole]

    def post(self, request, pk):

        try:
            vehicle = Vehicle.objects.get(pk=pk)

        except Vehicle.DoesNotExist:

            return Response(
                {"error": "Vehicle not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        quantity = int(request.data.get("quantity", 1))

        if quantity <= 0:

            return Response(
                {"error": "Quantity must be greater than zero"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if vehicle.quantity < quantity:

            return Response(
                {"error": "Not enough stock available"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        vehicle.quantity -= quantity
        vehicle.save()

        Purchase.objects.create(
            user=request.user,
            vehicle=vehicle,
            quantity=quantity,
        )

        return Response(
            {
                "message": "Vehicle purchased successfully"
            },
            status=status.HTTP_200_OK,
        )

class RestockVehicleView(APIView):

    permission_classes = [
    IsAuthenticated,
    IsAdminUserRole
]

    def post(self, request, pk):

        try:
            vehicle = Vehicle.objects.get(pk=pk)

        except Vehicle.DoesNotExist:

            return Response(
                {"error": "Vehicle not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        quantity = int(request.data.get("quantity", 1))

        if quantity <= 0:

            return Response(
                {"error": "Invalid quantity"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        vehicle.quantity += quantity

        vehicle.save()

        return Response(
            {
                "message": "Vehicle restocked successfully",
                "current_stock": vehicle.quantity,
            }
        )


class VehicleSearchView(ListAPIView):

    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [AllowAny]


    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
    ]


    search_fields = [
        "make",
        "model",
        "category",
    ]


    filterset_fields = [
        "category",
    ]



from .serializers import PurchaseSerializer

class MyPurchaseHistoryView(ListAPIView):

    serializer_class = PurchaseSerializer

    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Purchase.objects.filter(
            user=self.request.user
        ).order_by(
            "-purchased_at"
        )

from django.db.models import Sum
from .models import Vehicle, Purchase

class AdminDashboardStatsView(APIView):

    permission_classes = [IsAdminUserRole]

    def get(self, request):

        total_vehicles = Vehicle.objects.count()

        total_stock = (
            Vehicle.objects.aggregate(
                total=Sum("quantity")
            )["total"] or 0
        )

        total_purchases = Purchase.objects.count()

        total_customers = User.objects.filter(
            role="CUSTOMER"
        ).count()

        return Response({
            "total_vehicles": total_vehicles,
            "total_stock": total_stock,
            "total_purchases": total_purchases,
            "total_customers": total_customers,
        })