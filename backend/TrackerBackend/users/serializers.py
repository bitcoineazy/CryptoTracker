from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import CryptoUser, Asset, AssetForCryptoUser, UserPortfolio, GlobalMetrics


class CryptoUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = CryptoUser
        fields = "__all__"


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = "__all__"


class GetAssetSerializer(serializers.ModelSerializer):
    pass


class AssetForUserSerializer(serializers.ModelSerializer):
    asset = serializers.SlugRelatedField(queryset=Asset.objects.all(), slug_field="coin_id")
    add_date = serializers.DateTimeField()
    amount = serializers.DecimalField(max_digits=50, decimal_places=10)
    price = serializers.DecimalField(max_digits=50, decimal_places=10)

    class Meta:
        model = AssetForCryptoUser
        fields = ["asset", "add_date", "amount", "price"]


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255)

    class Meta:
        model = CryptoUser
        fields = ["id", "username", "password", "email"]


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoUser
        fields = "__all__"


# class AssetForPortfolioCreateSerializer(AssetForUserSerializer):
#     add_date = serializers.DateTimeField(write_only=True)
#     amount = serializers.DecimalField(max_digits=50, decimal_places=10, write_only=True)
#     price = serializers.DecimalField(max_digits=50, decimal_places=10, write_only=True)
#
#     def to_representation(self, instance):
#         return AssetForUserSerializer(AssetForCryptoUser.objects.filter(portfolio=instance.portfolio), many=True).data

class GetPortfolioByUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, read_only=True)
    assets = AssetForUserSerializer(many=True, read_only=True)
    portfolio_change_metrics = serializers.JSONField(read_only=True)
    portfolio_historical_graph = serializers.JSONField(read_only=True)

    class Meta:
        model = UserPortfolio
        fields = ["name", "assets", "portfolio_change_metrics", "portfolio_historical_graph"]

class PortfolioSerializer(serializers.ModelSerializer):
    crypto_user = CryptoUserSerializer(read_only=True)

    name = serializers.CharField(max_length=255)
    assets = serializers.SlugRelatedField(queryset=Asset.objects.all(), slug_field="coin_id", write_only=True,
                                          many=True)

    class Meta:
        model = UserPortfolio
        fields = ["crypto_user", "name", "assets"]

    def update(self, portfolio, validated_data):
        asset = validated_data.get("asset")
        print(f"add date: {validated_data.get('add_date')}")
        asset_in_portfolio = AssetForCryptoUser.objects.create(
            asset=asset,
            add_date=validated_data.get("add_date"),
            amount=validated_data.get("amount"),
            price=validated_data.get("price"),
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

class GlobalMetricsSerializer(serializers.ModelSerializer):
    total_market_cap = serializers.DecimalField(decimal_places=5, max_digits=100, read_only=True)
    total_volume = serializers.DecimalField(decimal_places=5, max_digits=100, read_only=True)
    market_cap_percentage = serializers.JSONField(read_only=True)
    market_cap_change_percentage = serializers.DecimalField(decimal_places=5, max_digits=100, read_only=True)

    class Meta:
        model = GlobalMetrics
        fields = "__all__"
