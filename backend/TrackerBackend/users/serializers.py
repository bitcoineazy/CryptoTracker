from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import CryptoUser, Asset, AssetForCryptoUser, UserPortfolio


class CryptoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoUser
        fields = "__all__"


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"


class AssetForUserSerializer(serializers.ModelSerializer):
    asset = serializers.SlugRelatedField(Asset, read_only=True)
    add_date = serializers.DateTimeField()
    amount = serializers.DecimalField(max_digits=50, decimal_places=10)
    price = serializers.DecimalField(max_digits=50, decimal_places=10)

    class Meta:
        model = AssetForCryptoUser
        fields = "__all__"

    # def validate(self, data):
    #     crypto_user = data["user"]["id"]
    #     asset = data["asset"]
    #     #existing_asset = CryptoUser.objects.filter(pk=crypto_user, assets=)
    #     # Проверка на выбор правильного инструмента
    #
    # def create(self, validated_data):
    #     crypto_user = validated_data.get("crypto_user")
    #     crypto_user = get_object_or_404(CryptoUser, pk=crypto_user.get("id"))
    #     if CryptoUser.objects.filter(user=crypto_user, asset=validated_data["asset"]):
    #         pass
    #
    #     return validated_data


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255)

    class Meta:
        model = CryptoUser
        fields = ["id", "username", "email"]


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoUser
        fields = "__all__"


class AssetForCryptoUserSerializer(serializers.ModelSerializer):
    pass


class AssetForPortfolioCreateSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=50, decimal_places=10)


class PortfolioSerializer(serializers.ModelSerializer):
    crypto_user = CryptoUserSerializer(read_only=True)

    name = serializers.CharField(max_length=255)
    # total_balance = serializers.DecimalField(max_digits=100, decimal_places=15)
    # total_profit = serializers.DecimalField(max_digits=100, decimal_places=15)
    # assets = AssetForUserSerializer(many=True, read_only=True)

    # portfolio_change_metrics = models.JSONField(null=True, default=dict)

    class Meta:
        model = UserPortfolio
        fields = ["crypto_user", "name"]

    def create(self, validated_data):
        #request = self.context.get("request")
        print(validated_data)
        #crypto_user = validated_data.get("crypto_user_id")
        crypto_user = get_object_or_404(CryptoUser)
        name = validated_data.get("name")
        return UserPortfolio.objects.create(crypto_user_id=crypto_user.id, name=name)
