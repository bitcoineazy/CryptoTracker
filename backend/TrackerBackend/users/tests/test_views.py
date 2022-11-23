from django.contrib.auth import get_user_model
from django.test import TestCase, Client

from users.models import CryptoUser


class TaskModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        CryptoUser.objects.create_user(
            username="first_username",
            password="dsad",
            email="12321@email.email"
        )

        cls.user = CryptoUser.objects.first()

    def setUp(self):
        self.guest_client = Client()
        User = get_user_model()

    def test_user_creation(self):
        """Пользователь успешно добавлен"""
        user = TaskModelTest.user
        self.assertEquals(user.username, "first_username")
