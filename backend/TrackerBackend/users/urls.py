from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

from .views import UserViewSet, AssetViewSet, PortfolioViewSet

router_v1 = DefaultRouter()

router_v1.register("users", UserViewSet)
router_v1.register("assets", AssetViewSet)
router_v1.register("portfolio", PortfolioViewSet)

urlpatterns = [
    path("api-token-auth/", auth_views.obtain_auth_token, name="api_token"),
    path("", include(router_v1.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
