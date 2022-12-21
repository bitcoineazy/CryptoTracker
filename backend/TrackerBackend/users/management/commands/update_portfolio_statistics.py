from django.core.management.base import BaseCommand
from users.models import UserPortfolio, Asset, CryptoUser

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np

cg = CoinGeckoAPI()


class Command(BaseCommand):
    help = "A description of the command"

    def handle(self, *args, **options):
        for user in CryptoUser.objects.all():
            # print(user)
            if UserPortfolio.objects.filter(crypto_user=user).exists():
                # print(UserPortfolio.objects.filter(crypto_user=user))
                for portfolio in UserPortfolio.objects.filter(crypto_user=user):
                    start_portfolio_equity = 0
                    end_portfolio_equity = 0
                    assets_in_portfolio_set = set()
                    assets_value = {}
                    for asset in portfolio.assets.all():
                        # print(portfolio.name, asset.amount, asset.price)
                        # print(asset.asset.coin_id)
                        start_portfolio_equity += asset.amount * asset.price
                        assets_in_portfolio_set.add(asset.asset.coin_id)
                        if not asset.asset.coin_id in assets_value.keys():
                            assets_value[asset.asset.coin_id] = asset.amount
                        else:
                            assets_value[asset.asset.coin_id] += asset.amount
                    # print(f"total portfolio equity: {start_portfolio_equity}")
                    # print(f"assets_in_portfolio_set: {assets_in_portfolio_set}")
                    # print(f"assets_amount: {assets_value}")

                    final_equity = 0
                    for coin_id, amount in assets_value.items():
                        final_equity += amount * Asset.objects.get(coin_id=coin_id).current_price
                    # print(f"final equity: {final_equity}")
                    portfolio.portfolio_change_metrics = {"final_equity": float(final_equity)}
                    portfolio.save()

        self.stdout.write(f"statistics")
