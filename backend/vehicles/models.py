from django.db import models


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