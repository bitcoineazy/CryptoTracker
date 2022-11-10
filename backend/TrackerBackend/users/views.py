import os
from dotenv import load_dotenv
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
import pandas as pd
import requests

from .models import CryptoUser, Asset
from .serializers import CreateUserSerializer, UserInfoSerializer, UserAssetSerializer

load_dotenv(".env")  # For local testing purposes, replace with os on deploy


class UserViewSet(viewsets.ModelViewSet):
    queryset = CryptoUser.objects.all()

    @action(url_path='users/info', methods=['GET'], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def user_info(self, request):
        user = request.user
        return Response({'info': UserInfoSerializer(user).data})

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
        serializer = UserAssetSerializer(
            data={"user": request.user.id, "asset": request}
        )


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()

    @action(url_path="assets/fill_assets", methods=["POST"], detail=False,
            permission_classes=[permissions.IsAdminUser])
    def fill_assets(self, request):
        headers = {"X-CMC_PRO_API_KEY": os.environ.get("X-CMC_PRO_API_KEY")}
        url_cmc_map = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
        get_cmc_tokens = requests.get(url_cmc_map, headers=headers).json()

        tokens_df = pd.json_normalize(get_cmc_tokens["data"])[["name", "symbol", "rank"]]

        asset_instances = [Asset(
            name=asset[0],
            symbol=asset[1],
            rank=asset[2],
        ) for asset in tokens_df.values]

        self.queryset.bulk_create(asset_instances)

        return Response(data={"message": "База данных успешно обновлена"}, status=status.HTTP_204_NO_CONTENT)
