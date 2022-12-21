import os
import time
from django.conf import settings
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.authtoken.models import Token
from pycoingecko import CoinGeckoAPI

import pandas as pd
import numpy as np

from .models import CryptoUser, Asset, UserPortfolio, GlobalMetrics
from .serializers import PortfolioSerializer, CryptoUserSerializer, CreateUserSerializer, AssetForUserSerializer, \
    GetPortfolioSerializer, AssetSerializer, GetPortfolioByUserSerializer, GlobalMetricsSerializer

cg = CoinGeckoAPI()


class UserViewSet(viewsets.ModelViewSet):
    queryset = CryptoUser.objects.all()
    serializer_class = CryptoUserSerializer

    @action(url_path='info', methods=['GET'], detail=False,
            permission_classes=[permissions.IsAuthenticated])  # isAuth
    def user_info(self, request):
        user = request.user
        return Response({'info': CryptoUserSerializer(user).data}, status=status.HTTP_200_OK)

    @action(url_path='create', methods=['POST'], detail=False,
            permission_classes=[permissions.AllowAny])
    def create_user(self, request):

        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data['password']
            # try:
            #     validate_password(password)
            user = CryptoUser.objects.create_user(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
                email=serializer.validated_data.get('email'))
            token = Token.objects.create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
            # except ValidationError as e:
            #     return Response({"errors": {"password": e}}, status.HTTP_404_NOT_FOUND)
        return Response({'errors': serializer.errors}, status.HTTP_404_NOT_FOUND)


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    @action(url_path="by_coin_id", methods=["POST"], detail=False,
            permission_classes=[permissions.AllowAny])
    def get_asset_by_coin_id(self, request):
        coin_id = request.data.get("coin_id")
        # print(coin_id)
        assets = get_object_or_404(Asset, coin_id=coin_id)
        # print(assets)
        asset_serializer = AssetSerializer(assets)
        return Response(data=asset_serializer.data, status=status.HTTP_200_OK)


    @action(url_path="fill_assets", methods=["POST"], detail=False,
            permission_classes=[permissions.AllowAny])  # isAdmin
    def fill_assets(self, request):
        """CoinGecko api"""

        asset_data = cg.get_coins_list(include_platform=True)
        json_data = pd.json_normalize(asset_data, max_level=0)

        asset_instances = [Asset(
            coin_id=asset[0],
            symbol=asset[1],
            name=asset[2],
            platforms=asset[3],
        ) for asset in json_data.values]

        self.queryset.bulk_create(asset_instances)
        return Response(data={"message": "База данных успешно обновлена"}, status=status.HTTP_200_OK)

    @action(url_path="update_assets", methods=["POST"], detail=False,
            permission_classes=[permissions.AllowAny])  # isAdmin
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

        return Response(data={"message": "База данных успешно обновлена"}, status=status.HTTP_200_OK)


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = UserPortfolio.objects.all()
    serializer_class = PortfolioSerializer

    # Получение портфеля
    @action(url_path="get_portfolio", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAuthenticated])  # isAuth
    def get_portfolio(self, request):
        portfolio_serializer = PortfolioSerializer(data=request.data)
        if portfolio_serializer.is_valid():
            portfolio_name = portfolio_serializer.validated_data.get("name")
            portfolio = get_object_or_404(UserPortfolio, crypto_user_id=request.user.id, name=portfolio_name)
            get_portfolio_serializer = GetPortfolioSerializer(portfolio)
            return Response(data=get_portfolio_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(portfolio_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(url_path="get_portfolio_by_user", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAuthenticated])  # isAuth
    def get_portfolio_by_user(self, request):
        portfolio_names = get_list_or_404(UserPortfolio, crypto_user=request.user)
        portfolio_serializer = GetPortfolioByUserSerializer(portfolio_names, many=True)
        return Response(data=portfolio_serializer.data, status=status.HTTP_200_OK)

    @action(url_path="add_portfolio", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAuthenticated])  # isAuth
    def add_portfolio(self, request):
        portfolio_serializer = PortfolioSerializer(data=request.data)
        if portfolio_serializer.is_valid():
            portfolio_name = portfolio_serializer.validated_data.get("name")
            if not UserPortfolio.objects.filter(crypto_user_id=request.user.id, name=portfolio_name).exists():
                new_portfolio = UserPortfolio.objects.create(crypto_user_id=request.user.id, name=portfolio_name)
                return Response({'Portfolio': f'Portfolio with name {new_portfolio.name} created'},
                                status=status.HTTP_200_OK)
            else:
                return Response(data={"message": "Portfolio with that name and user already exists"},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(portfolio_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(url_path="update_portfolio", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAuthenticated])  # isAuth
    def update_portfolio(self, request):
        symbol_assets = Asset.objects.filter(symbol=request.data.get("assets"))
        portfolio_serializer = PortfolioSerializer(data={"crypto_user": request.user,
                                                         "name": request.data.get("name"),
                                                         "assets": [symbol_assets[0].coin_id]})

        if portfolio_serializer.is_valid():
            print(portfolio_serializer.data)
            portfolio_name = portfolio_serializer.validated_data.get("name")
            asset_in_portfolio_serializer = AssetForUserSerializer(data={"asset": symbol_assets[0].coin_id,
                                                                         "add_date": request.data.get("add_date"),
                                                                         "amount": request.data.get("amount"),
                                                                         "price": request.data.get("price")})
            if asset_in_portfolio_serializer.is_valid():
                portfolio = get_object_or_404(UserPortfolio, crypto_user_id=request.user.id, name=portfolio_name)
                portfolio_serializer.update(portfolio, validated_data=asset_in_portfolio_serializer.validated_data)

                return Response({"message": f"Successfully added: {asset_in_portfolio_serializer.data}, "
                                            f"to user: {request.user.username}, "
                                            f"in portfolio: {request.data.get('name')}"},
                                status=status.HTTP_200_OK)
            else:
                return Response(asset_in_portfolio_serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            print(portfolio_serializer.errors)
            return Response(portfolio_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(url_path="statistics", methods=["POST"], detail=False,
            permission_classes=[permissions.AllowAny])  # isAuth
    def update_statistics(self, request):
        for user in CryptoUser.objects.all():
            print(user)
            if UserPortfolio.objects.filter(crypto_user=user).exists():
                print(UserPortfolio.objects.filter(crypto_user=user))
                for portfolio in  UserPortfolio.objects.filter(crypto_user=user):
                    start_portfolio_equity = 0
                    end_portfolio_equity = 0
                    assets_in_portfolio_set = set()
                    assets_value = {}
                    for asset in portfolio.assets.all():
                        print(portfolio.name, asset.amount, asset.price)
                        print(asset.asset.coin_id)
                        start_portfolio_equity += asset.amount * asset.price
                        assets_in_portfolio_set.add(asset.asset.coin_id)
                        if not asset.asset.coin_id in assets_value.keys():
                            assets_value[asset.asset.coin_id] = asset.amount
                        else:
                            assets_value[asset.asset.coin_id] += asset.amount
                    print(f"total portfolio equity: {start_portfolio_equity}")
                    print(f"assets_in_portfolio_set: {assets_in_portfolio_set}")
                    print(f"assets_amount: {assets_value}")

                    final_equity = 0
                    for coin_id, amount in assets_value.items():
                        final_equity += amount * Asset.objects.get(coin_id=coin_id).current_price
                    print(f"final equity: {final_equity}")
                    portfolio.portfolio_change_metrics={"final_equity": float(final_equity)}
                    portfolio.save()
        return Response({"data": "OK"}, status=status.HTTP_200_OK)

    @action(url_path="statistics_graph", methods=["POST"], detail=False,
            permission_classes=[permissions.AllowAny])  # isAuth
    def update_statistics_graph(self, request):
        for user in CryptoUser.objects.all():
            # print(user)
            if UserPortfolio.objects.filter(crypto_user=user).exists():
                # print(UserPortfolio.objects.filter(crypto_user=user))
                for portfolio in UserPortfolio.objects.filter(crypto_user=user):
                    start_portfolio_equity = 0
                    end_portfolio_equity = 0
                    assets_in_portfolio_set = set()
                    assets_value = {}
                    days_set = []
                    historical_graph = {}
                    for asset in portfolio.assets.all():
                        print(portfolio.name, asset.amount, asset.price, int(time.mktime(asset.add_date.timetuple())), asset.add_date.strftime("%d-%m-%Y"))
                        if not asset.add_date.strftime("%d-%m-%Y") in historical_graph.keys():
                            historical_graph[asset.add_date.strftime("%d-%m-%Y")] = [{asset.asset.coin_id: asset.amount}]
                        else:
                            if not any([item.get(asset.asset.coin_id) for item in historical_graph[asset.add_date.strftime("%d-%m-%Y")]]):
                                historical_graph[asset.add_date.strftime("%d-%m-%Y")].append({asset.asset.coin_id: asset.amount})
                            else:
                                historical_graph[asset.add_date.strftime("%d-%m-%Y")].
                        # print(asset.asset.coin_id)
                        start_portfolio_equity += asset.amount * asset.price
                        assets_in_portfolio_set.add(asset.asset.coin_id)
                        if not asset.asset.coin_id in assets_value.keys():
                            assets_value[asset.asset.coin_id] = asset.amount
                        else:
                            assets_value[asset.asset.coin_id] += asset.amount
                    print(f"total portfolio equity: {start_portfolio_equity}")
                    print(f"assets_in_portfolio_set: {assets_in_portfolio_set}")
                    print(f"assets_amount: {assets_value}")

                    final_equity = 0
                    for coin_id, amount in assets_value.items():
                        final_equity += amount * Asset.objects.get(coin_id=coin_id).current_price
                    print(f"final equity: {final_equity}")
                    print(f"historical_graph: {historical_graph}")
                    portfolio.portfolio_change_metrics = {"final_equity": float(final_equity)}
                    portfolio.save()
        return Response({"data": "OK"}, status=status.HTTP_200_OK)


class GlobalMetricsViewSet(viewsets.ModelViewSet):
    queryset = GlobalMetrics.objects.all()
    serializer_class = GlobalMetricsSerializer

    @action(url_path="get_global_metrics", methods=["GET"], detail=False,
            permission_classes=[permissions.AllowAny])
    def get_global_metrics(self, request):
        global_metrics = get_object_or_404(GlobalMetrics, id=1)
        global_metrics_serializer = GlobalMetricsSerializer(global_metrics)
        return Response(global_metrics_serializer.data, status=status.HTTP_200_OK)
