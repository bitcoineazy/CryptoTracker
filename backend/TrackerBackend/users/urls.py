from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth_views

from .views import UserViewSet, AssetViewSet, PortfolioViewSet

router_v1 = DefaultRouter()

router_v1.register("", UserViewSet)
router_v1.register("", AssetViewSet)
router_v1.register("", PortfolioViewSet)

urlpatterns = [
    path("api-token-auth/", auth_views.obtain_auth_token, name="api_token"),
    path("", include(router_v1.urls)),
]
