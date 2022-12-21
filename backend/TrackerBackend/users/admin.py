from django.contrib import admin

from .models import CryptoUser, Asset, Category, AssetForCryptoUser, GlobalMetrics, UserPortfolio


class CryptoUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username")
    list_filter = ("username", "email")


class AssetAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Asset._meta.fields if field.name != "id"]
    list_filter = ("market_cap_rank", )


class UserPortfolioAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserPortfolio._meta.fields if field.name != "id"]
    list_filter = ("total_balance", )


class GlobalMetricsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in GlobalMetrics._meta.fields if field.name != "id"]
    list_filter = ("total_market_cap", )


class AssetForCryptoUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in AssetForCryptoUser._meta.fields if field.name != "id"]
    list_filter = ("add_date", )


class CategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Category._meta.fields if field.name != "id"]
    list_filter = ("market_cap", )


admin.site.register(CryptoUser, CryptoUserAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(UserPortfolio, UserPortfolioAdmin)
admin.site.register(GlobalMetrics, GlobalMetricsAdmin)
admin.site.register(AssetForCryptoUser, AssetForCryptoUserAdmin)
admin.site.register(Category, CategoryAdmin)
