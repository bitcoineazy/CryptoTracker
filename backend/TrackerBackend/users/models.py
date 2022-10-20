from django.contrib.auth.models import AbstractUser
from django.db import models


class Asset(models.Model):
    name = models.CharField(
        max_length=200,
        verbose_name='Название актива',
        help_text='Введите название актива')
    amount = models.DecimalField(
        max_digits=50,
        decimal_places=10,
        verbose_name='Кол-во актива',
        help_text='Введите кол-во актива')
    add_date = models.DateTimeField(
        'Дата добавления', auto_now_add=True
    )
    price = models.DecimalField(
        max_digits=50,
        decimal_places=10,
        verbose_name="Цена закупки актива",
        help_text="Введите цену покупки актива"
    )


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
