from django.core.management.base import BaseCommand
from users.models import Asset, UserPortfolio

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np

cg = CoinGeckoAPI()


class Command(BaseCommand):
    help = "A description of the command"
    assets_in_portfolio_set = set()

    def handle(self, *args, **options):
        for portfolio in UserPortfolio.objects.all():
            portfolio_assets = portfolio.assets.all()
            for asset in portfolio_assets:
                coin_id = asset.asset.coin_id
                self.assets_in_portfolio_set.add(coin_id)

        update_data = pd.json_normalize(
            cg.get_coins_markets(vs_currency="usd", ids=list(self.assets_in_portfolio_set),
                                 order="market_cap_desc", per_page=250, page=1), max_level=0)
        update_data = update_data.replace({np.nan: None})

        for coin_id in update_data["id"]:
            remote_asset = update_data[update_data["id"] == coin_id]

            Asset.objects.filter(coin_id=coin_id).update(
                image=remote_asset["image"].values[0],
                current_price=remote_asset["current_price"].values[0],
                market_cap_rank=remote_asset["market_cap_rank"].values[0],
                # market_cap=remote_asset["market_cap"].values[0],
                # fully_diluted_valuation=remote_asset["fully_diluted_valuation"].values[0],
                # total_volume=remote_asset["total_volume"].values[0],
                # high_24h=remote_asset["high_24h"].values[0],
                # low_24h=remote_asset["low_24h"].values[0],
                price_change_24h=remote_asset["price_change_24h"].values[0],
                price_change_percentage_24h=remote_asset["price_change_percentage_24h"].values[0],
                # market_cap_change_24h=remote_asset["market_cap_change_24h"].values[0],
                market_cap_change_percentage_24h=remote_asset["market_cap_change_percentage_24h"].values[0],
                circulating_supply=remote_asset["circulating_supply"].values[0],
                total_supply=remote_asset["total_supply"].values[0],
                max_supply=remote_asset["max_supply"].values[0],
                ath=remote_asset["ath"].values[0],
                ath_change_percentage=remote_asset["ath_change_percentage"].values[0],
                ath_date=remote_asset["ath_date"].values[0],
                atl=remote_asset["atl"].values[0],
                atl_change_percentage=remote_asset["atl_change_percentage"].values[0],
                atl_date=remote_asset["atl_date"].values[0],
                roi=remote_asset["roi"].values[0],
            )

        self.stdout.write(f"set of coin ids: {self.assets_in_portfolio_set}")