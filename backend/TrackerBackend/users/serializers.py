from rest_framework import serializers

from models import CryptoUser


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max=255)

    class Meta:
        model = CryptoUser
        fields = ["id", "username", "email"]


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoUser
        fields = "__all__"
