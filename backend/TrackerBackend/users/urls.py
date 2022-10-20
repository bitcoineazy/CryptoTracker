from django.urls import include, path
from rest_framework.routers import DefaultRouter
import views

router_v1 = DefaultRouter()

router_v1.register('', views.UserViewSet)

urlpatterns = [
    path('users/', include(router_v1.urls)),
]
