from django.db import models
from django.conf import settings


class Vehicle(models.Model):

    CATEGORY_CHOICES = [
        ("SUV", "SUV"),
        ("SEDAN", "Sedan"),
        ("HATCHBACK", "Hatchback"),
        ("TRUCK", "Truck"),
        ("SPORTS", "Sports"),
        ("ELECTRIC", "Electric"),
    ]

    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.make} {self.model}"

class Purchase(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.vehicle.make} {self.vehicle.model}"