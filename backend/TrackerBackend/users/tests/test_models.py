from django.contrib.auth import get_user_model
from django.test import TestCase


class TaskModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        CryptoUser = get_user_model()
        CryptoUser.objects.create_user(
            username="first_username",
            password="dsad",
            email="12321@email.email"
        )

        cls.user = CryptoUser.objects.first()

    def test_user_creation(self):
        """Модель пользователя работает исправно"""
        user = TaskModelTest.user
        self.assertEquals(user.username, "first_username")
        self.assertEquals(user.email, "12321@email.email")
