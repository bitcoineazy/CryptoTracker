from django.contrib import admin

from .models import CryptoUser, Asset


class CryptoUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username")
    list_filter = ("username", "email")


class AssetAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "symbol", "rank")
    list_filter = ("name", "rank")


admin.site.register(CryptoUser, CryptoUserAdmin)
admin.site.register(Asset, AssetAdmin)
