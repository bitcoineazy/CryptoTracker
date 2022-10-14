from django.contrib.auth.models import AbstractUser
from django.db import models


class CryptoUser(AbstractUser):
    username = models.CharField(
        verbose_name='Имя пользователя', unique=True, max_length=100)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('username',)

    def __str__(self):
        return self.username
