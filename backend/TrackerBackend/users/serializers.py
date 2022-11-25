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
    asset = AssetSerializer(read_only=True)
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
    assets = serializers.SlugRelatedField(queryset=Asset.objects.all(), slug_field="coin_id", many=True)
    # assets = serializers.SlugRelatedField(queryset=AssetForCryptoUser.objects.all(), slug_field="asset", many=True)
    #assets = serializers
    # total_balance = serializers.DecimalField(max_digits=100, decimal_places=15)
    # total_profit = serializers.DecimalField(max_digits=100, decimal_places=15)
    # assets = AssetForUserSerializer(many=True, read_only=True)

    # portfolio_change_metrics = models.JSONField(null=True, default=dict)

    class Meta:
        model = UserPortfolio
        fields = ["crypto_user", "name", "assets"]

    def create(self, validated_data):
        #request = self.context.get("request")
        print(validated_data)
        #crypto_user = validated_data.get("crypto_user_id")
        crypto_user = get_object_or_404(CryptoUser)
        name = validated_data.get("name")
        # asset_coin_ids = validated_data.get("asset_coin_ids")

        # assets_in_portfolio = [AssetForCryptoUser(
        #     asset=get_object_or_404(Asset, coin_id=asset_coin_id["coin_id"])
        # ) for asset_coin_id in asset_coin_ids]
        #AssetForCryptoUser.objects.bulk_create(assets_in_portfolio)
        return UserPortfolio.objects.create(crypto_user_id=crypto_user.id, name=name)

    def update(self, portfolio, validated_data):
        print(f"update validated_data: {validated_data}")
        assets = validated_data.get("assets")
        print(assets)

        portfolio_data = UserPortfolio.objects.get(name=portfolio.name)
        print(portfolio_data)
        portfolio_data.update_or_create(**validated_data)

        # asset_coin_ids = validated_data.get("asset_coin_ids")
        # assets_in_portfolio = [AssetForCryptoUser(
        #     asset=get_object_or_404(Asset, coin_id=asset_coin_id["coin_id"])
        # ) for asset_coin_id in asset_coin_ids]

        return portfolio

