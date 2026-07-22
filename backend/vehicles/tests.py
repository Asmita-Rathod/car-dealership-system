from django.contrib.auth import get_user_model

from rest_framework.test import APITestCase
from rest_framework import status

from .models import Vehicle, Purchase


User = get_user_model()


class VehicleAPITestCase(APITestCase):

    def setUp(self):

        # Create customer user
        self.user = User.objects.create_user(
            username="testuser",
            email="test@gmail.com",
            password="testpassword123",
            role="CUSTOMER"
        )


        # Create admin user
        self.admin = User.objects.create_user(
            username="admin",
            email="admin@gmail.com",
            password="admin123",
            role="ADMIN"
        )


        # Create vehicle
        self.vehicle = Vehicle.objects.create(
            make="Toyota",
            model="Fortuner",
            category="SUV",
            price=3500000,
            quantity=5
        )


    # Test GET all vehicles (PUBLIC)
    def test_vehicle_list(self):

        response = self.client.get(
            "/api/vehicles/"
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )


        self.assertEqual(
            len(response.data),
            1
        )



    # Test POST create vehicle (ADMIN only)
    def test_create_vehicle(self):

        self.client.force_authenticate(
            user=self.admin
        )


        data = {
            "make": "BMW",
            "model": "X5",
            "category": "SUV",
            "price": 9500000,
            "quantity": 3
        }


        response = self.client.post(
            "/api/vehicles/",
            data
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )


        self.assertEqual(
            Vehicle.objects.count(),
            2
        )



    # Test vehicle detail (PUBLIC)
    def test_vehicle_detail(self):

        response = self.client.get(
            f"/api/vehicles/{self.vehicle.id}/"
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )


        self.assertEqual(
            response.data["make"],
            "Toyota"
        )



    # Test vehicle search (PUBLIC)
    def test_vehicle_search(self):

        response = self.client.get(
            "/api/vehicles/search/?search=Toyota"
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )


        self.assertEqual(
            len(response.data),
            1
        )



    # Test successful purchase (CUSTOMER)
    def test_purchase_vehicle(self):

        self.client.force_authenticate(
            user=self.user
        )


        response = self.client.post(
            f"/api/vehicles/{self.vehicle.id}/purchase/",
            {
                "quantity": 2
            }
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )


        self.vehicle.refresh_from_db()


        self.assertEqual(
            self.vehicle.quantity,
            3
        )


        self.assertEqual(
            Purchase.objects.count(),
            1
        )



    # Test purchase when stock unavailable
    def test_purchase_without_stock(self):

        self.client.force_authenticate(
            user=self.user
        )


        response = self.client.post(
            f"/api/vehicles/{self.vehicle.id}/purchase/",
            {
                "quantity": 10
            }
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )



    # Test restock (ADMIN only)
    def test_restock_vehicle(self):

        self.client.force_authenticate(
            user=self.admin
        )


        response = self.client.post(
            f"/api/vehicles/{self.vehicle.id}/restock/",
            {
                "quantity": 5
            }
        )


        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )


        self.vehicle.refresh_from_db()


        self.assertEqual(
            self.vehicle.quantity,
            10
        )