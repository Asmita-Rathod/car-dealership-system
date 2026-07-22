from rest_framework import serializers
from .models import Vehicle, Purchase


class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = "__all__"


class PurchaseSerializer(serializers.ModelSerializer):

    vehicle = VehicleSerializer(read_only=True)

    class Meta:
        model = Purchase
        fields = "__all__"
        read_only_fields = [
            "user",
            "purchased_at",
        ]