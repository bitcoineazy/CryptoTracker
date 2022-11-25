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
    asset = serializers.SlugRelatedField(queryset=Asset.objects.all(), slug_field="coin_id")
    add_date = serializers.DateTimeField()
    amount = serializers.DecimalField(max_digits=50, decimal_places=10)
    price = serializers.DecimalField(max_digits=50, decimal_places=10)

    class Meta:
        model = AssetForCryptoUser
        fields = "__all__"


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
    asset = serializers.SlugRelatedField(queryset=Asset.objects.all(), slug_field="coin_id", many=True)
    # assets = serializers.SlugRelatedField(queryset=AssetForCryptoUser.objects.all(), slug_field="asset", many=True)

    class Meta:
        model = UserPortfolio
        fields = ["crypto_user", "name", "asset"]

    def create(self, validated_data):
        crypto_user = get_object_or_404(CryptoUser)
        name = validated_data.get("name")

        return UserPortfolio.objects.create(crypto_user_id=crypto_user.id, name=name)

    def update(self, portfolio, validated_data):
        asset = validated_data.get("asset")
        asset_in_portfolio = AssetForCryptoUser.objects.create(
            asset=asset,
            add_date=validated_data.get("add_date"),
            amount=validated_data.get("amount"),
            price=validated_data.get("price")
        )

        portfolio.assets.add(asset_in_portfolio)
        portfolio.save()

        return portfolio


class GetPortfolioSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    assets = AssetForUserSerializer(many=True, read_only=True)

    class Meta:
        model = UserPortfolio
        fields = ["name", "assets"]
