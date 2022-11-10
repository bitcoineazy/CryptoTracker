from django.contrib.auth.models import AbstractUser
from django.db import models


# TODO: Модель активов будет собирать данные с API и хранить в себе информацию про крипту
# TODO: Модель активов под пользователя будет составлять портфель
class Asset(models.Model):
    name = models.CharField(
        max_length=200,
        verbose_name='Название актива')
    symbol = models.CharField(
        max_length=100,
        verbose_name='Сокращенное название актива', null=True)
    rank = models.IntegerField(verbose_name="Ранг актива", null=True, unique=True)

    class Meta:
        ordering = ["rank"]
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
    assets = models.ManyToManyField(Asset, verbose_name="Укажите активы и их количество")

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
    crypto_user = models.ForeignKey(CryptoUser, on_delete=models.CASCADE,
                                    related_name="asset_amounts")
    add_date = models.DateTimeField(
        'Дата добавления', auto_now_add=True
    )
    amount = models.DecimalField(
        max_digits=50,
        decimal_places=10,
        verbose_name='Кол-во актива',
        help_text='Введите кол-во актива')
    price = models.DecimalField(
        max_digits=50,
        decimal_places=10,
        verbose_name="Цена закупки актива",
    )

    class Meta:
        verbose_name = "Кол-во актива у пользователя"
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.crypto_user}: {self.asset}"
