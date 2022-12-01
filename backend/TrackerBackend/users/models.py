from django.contrib.auth.models import AbstractUser
from django.db import models


class Asset(models.Model):
    coin_id = models.CharField(max_length=500, verbose_name="Название актива", null=True)
    symbol = models.CharField(max_length=500, verbose_name='Сокращенное название актива', null=True)
    name = models.CharField(max_length=500, verbose_name='Название актива', null=True)
    market_cap_rank = models.IntegerField(verbose_name="Ранг актива по капитализации", null=True)
    image = models.URLField(max_length=500, verbose_name="Ссылка на картинку", null=True)
    current_price = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    market_cap = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    fully_diluted_valuation = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    total_volume = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    high_24h = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    low_24h = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    price_change_24h = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    price_change_percentage_24h = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    market_cap_change_24h = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    market_cap_change_percentage_24h = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    circulating_supply = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    total_supply = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    max_supply = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    ath = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    ath_change_percentage = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    ath_date = models.DateTimeField(null=True)
    atl = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    atl_change_percentage = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    atl_date = models.DateTimeField(null=True)
    roi = models.JSONField(null=True, default=dict)
    last_updated = models.DateTimeField(null=True)
    platforms = models.JSONField(verbose_name="Платформы", null=True, default=dict)

    class Meta:
        ordering = ["market_cap_rank"]
        verbose_name = "Активы"

    def __str__(self):
        return self.name


class CryptoUser(AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    username = models.CharField(
        verbose_name='Имя пользователя', unique=True, max_length=100)
    email = models.EmailField(
        verbose_name='Адрес электронной почты', unique=True, max_length=150)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('username',)

    def __str__(self):
        return self.username


class AssetForCryptoUser(models.Model):
    # TODO: asset, amount validators
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE,
                              related_name="asset_amounts")
    add_date = models.DateTimeField(
        'Дата добавления', auto_now_add=True
    )
    amount = models.DecimalField(
        max_digits=50,
        decimal_places=10,
        verbose_name='Кол-во актива',
        help_text='Введите кол-во актива',
    )
    price = models.DecimalField(
        max_digits=50,
        decimal_places=10,
        verbose_name="Цена закупки актива",
    )

    class Meta:
        verbose_name = "Актив для пользователя"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.asset.coin_id


class UserPortfolio(models.Model):
    crypto_user = models.ForeignKey(CryptoUser, on_delete=models.CASCADE, related_name="user_portfolio", null=True)
    name = models.CharField(max_length=255, unique=True, default="Main portfolio")
    total_balance = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    total_profit = models.DecimalField(max_digits=100, decimal_places=15, null=True)
    assets = models.ManyToManyField(AssetForCryptoUser, verbose_name="Активы в портфеле", default={})
    portfolio_change_metrics = models.JSONField(null=True, default=dict)

    class Meta:
        verbose_name = "Портфель пользователя"
        verbose_name_plural = "Портфели пользователя"

        def __str__(self):
            return f"Пользователь: {self.crypto_user.username} - Портфель: {self.name}"
