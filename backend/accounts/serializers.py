from rest_framework import serializers
from .models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )


    class Meta:

        model = User

        fields = [
            "username",
            "email",
            "password",
            "role"
        ]



    def create(self, validated_data):

        user = User.objects.create_user(

            username=validated_data["username"],

            email=validated_data["email"],

            password=validated_data["password"],

            role=validated_data.get(
                "role",
                "CUSTOMER"
            )

        )


        return user





class LoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["email"] = user.email
        token["role"] = user.role

        return token


    def validate(self, attrs):

        data = super().validate(attrs)

        data["email"] = self.user.email
        data["role"] = self.user.role

        return data