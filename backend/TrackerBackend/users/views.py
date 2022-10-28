from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404

from models import CryptoUser
from serializers import CreateUserSerializer, UserInfoSerializer, UserAssetSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CryptoUser.objects.all()

    @action(url_path='info', methods=['GET'], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def user_info(self, request):
        user = request.user
        return Response({'info': UserInfoSerializer(user).data})

    @action(url_path='create', methods=['POST'], detail=False,
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

    @action(url_path='add_asset', methods=['POST'], detail=False,
            permission_classes=[permissions.IsAuthenticated])
    def add_asset(self, request):
        crypto_user = get_object_or_404(CryptoUser, id=request.user.id)
        serializer = UserAssetSerializer(
            data={"user": request.user.id, "asset": request}
        )

