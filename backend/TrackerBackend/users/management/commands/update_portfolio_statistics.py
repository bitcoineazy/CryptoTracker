from django.core.management.base import BaseCommand
from users.models import UserPortfolio

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np

cg = CoinGeckoAPI()


class Command(BaseCommand):
    help = "A description of the command"

    def handle(self, *args, **options):
        assets_in_portfolio = ""
        for portfolio in UserPortfolio.objects.all():
            portfolio_assets = portfolio.assets.all()

        self.stdout.write(f"statistics")
