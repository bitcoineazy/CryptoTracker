from django.contrib import admin

from .models import CryptoUser


class CryptoUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "username")
    list_filter = ("username", "email")


admin.site.register(CryptoUser, CryptoUserAdmin)
