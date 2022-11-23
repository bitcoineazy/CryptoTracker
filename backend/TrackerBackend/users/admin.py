from django.contrib import admin

from .models import CryptoUser, Asset


class CryptoUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username")
    list_filter = ("username", "email")


class AssetAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Asset._meta.fields if field.name != "id"]
    list_filter = ("market_cap_rank", )


admin.site.register(CryptoUser, CryptoUserAdmin)
admin.site.register(Asset, AssetAdmin)
