import os
from django.conf import settings
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from pycoingecko import CoinGeckoAPI

import pandas as pd
import numpy as np

from .models import CryptoUser, Asset, UserPortfolio
from .serializers import PortfolioSerializer, CryptoUserSerializer, CreateUserSerializer

cg = CoinGeckoAPI()


class UserViewSet(viewsets.ModelViewSet):
    queryset = CryptoUser.objects.all()

    @action(url_path='users/info', methods=['GET'], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def user_info(self, request):
        user = request.user
        return Response({'info': CryptoUserSerializer(user).data})

    @action(url_path='users/create', methods=['POST'], detail=False,
            permission_classes=[permissions.AllowAny])
    def create_user(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data['password']
            try:
                validate_password(password)
                user = CryptoUser.objects.create_user(
                    username=serializer.validated_data['username'],
                    password=serializer.validated_data['password'],
                    email=serializer.validated_data.get('email'))
                return Response({'Created successfully!': user.username})
            except ValidationError as e:
                return Response(str(e), status.HTTP_404_NOT_FOUND)
        return Response({'errors': serializer.errors}, status.HTTP_404_NOT_FOUND)

    @action(url_path='users/add_asset', methods=['POST'], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def add_asset(self, request):
        crypto_user = get_object_or_404(CryptoUser, id=request.user.id)
        serializer = PortfolioSerializer(data={"name": request["name"]})
        # serializer = UserAssetSerializer(
        #     data={"user": request.user.id, "asset": request}
        # )


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()

    @action(url_path="assets/fill_assets", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAdminUser])
    def fill_assets(self, request):
        """CoinGecko api"""

        # asset_data = pd.read_json("response_1669219617967.json")
        asset_data = cg.get_coins_list(include_platform=True)
        json_data = pd.json_normalize(asset_data, max_level=0)

        asset_instances = [Asset(
            coin_id=asset[0],
            symbol=asset[1],
            name=asset[2],
            platforms=asset[3],
        ) for asset in json_data.values]

        self.queryset.bulk_create(asset_instances)
        return Response(data={"message": "База данных успешно обновлена"}, status=status.HTTP_204_NO_CONTENT)

    @action(url_path="assets/update_assets", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAdminUser])
    def update_assets(self, request):
        local_data = pd.read_json(os.path.join(settings.BASE_DIR, 'coins_markets.json'))
        local_data = local_data.replace({np.nan: None})
        # print(local_data)

        for i, coin_id in enumerate(local_data["id"]):
            local_asset = local_data[local_data["id"] == coin_id]
            Asset.objects.filter(coin_id=coin_id).update(
                image=local_asset["image"].values[0],
                current_price=local_asset["current_price"].values[0],
                market_cap_rank=local_asset["market_cap_rank"].values[0],
                market_cap=local_asset["market_cap"].values[0],
                fully_diluted_valuation=local_asset["fully_diluted_valuation"].values[0],
                total_volume=local_asset["total_volume"].values[0],
                high_24h=local_asset["high_24h"].values[0],
                low_24h=local_asset["low_24h"].values[0],
                price_change_24h=local_asset["price_change_24h"].values[0],
                price_change_percentage_24h=local_asset["price_change_percentage_24h"].values[0],
                market_cap_change_24h=local_asset["market_cap_change_24h"].values[0],
                market_cap_change_percentage_24h=local_asset["market_cap_change_percentage_24h"].values[0],
                circulating_supply=local_asset["circulating_supply"].values[0],
                total_supply=local_asset["total_supply"].values[0],
                max_supply=local_asset["max_supply"].values[0],
                ath=local_asset["ath"].values[0],
                ath_change_percentage=local_asset["ath_change_percentage"].values[0],
                ath_date=local_asset["ath_date"].values[0],
                atl=local_asset["atl"].values[0],
                atl_change_percentage=local_asset["atl_change_percentage"].values[0],
                atl_date=local_asset["atl_date"].values[0],
                roi=local_asset["roi"].values[0],

            )
            print(i)

        return Response(data={"message": "База данных успешно обновлена"}, status=status.HTTP_204_NO_CONTENT)


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = UserPortfolio.objects.all()

    @action(url_path="portfolio/add_portfolio", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def add_portfolio(self, request):
        # portfolio = get_object_or_404(UserPortfolio, crypto_user=self.request.user)
        print(request.data)
        portfolio_serializer = PortfolioSerializer(data=request.data)
        if portfolio_serializer.is_valid():
            print(portfolio_serializer.validated_data)
            portfolio_name = portfolio_serializer.validated_data.get("name")
            # portfolio_asset = portfolio_serializer.validated_data.get("asset")
            if not UserPortfolio.objects.filter(crypto_user_id=request.user.id, name=portfolio_name).exists():
                portfolio_serializer.create(portfolio_serializer.validated_data)
                return Response({'Portfolio': f'Portfolio with name {portfolio_name} created'},
                                status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(data={"message": "Portfolio with that name and user already exists"},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(portfolio_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(url_path="portfolio/update_portfolio", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def update_portfolio(self, request):
        portfolio_serializer = PortfolioSerializer(data=request.data)
        if portfolio_serializer.is_valid():
            portfolio_name = portfolio_serializer.validated_data.get("name")
            portfolio_asset = portfolio_serializer.validated_data.get("assets")
            print(f"viewset name: {portfolio_name}, asset: {portfolio_asset}")

            if not UserPortfolio.objects.filter(crypto_user_id=request.user.id, name=portfolio_name).exists():
                portfolio_serializer.create(portfolio_serializer.validated_data)
                return Response({'Portfolio': f'Portfolio with name {portfolio_name} created'},
                                status=status.HTTP_204_NO_CONTENT)
            else:
                portfolio = get_object_or_404(UserPortfolio, crypto_user_id=request.user.id, name=portfolio_name)
                print(portfolio_serializer.validated_data)
                portfolio_serializer.update(portfolio, portfolio_serializer.validated_data)

                return Response(data={"message": "Add assets"},
                                status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(portfolio_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
