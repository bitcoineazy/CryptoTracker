from django.core.management.base import BaseCommand
from users.models import Asset

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np

cg = CoinGeckoAPI()


class Command(BaseCommand):
    help = "Update top 250 assets"

    def handle(self, *args, **options):
        top_250 = pd.json_normalize(cg.get_coins_markets(vs_currency="usd", per_page=250), max_level=0)
        top_250 = top_250.replace({np.nan: None})

        for index, asset in top_250.iterrows():
            Asset.objects.filter(coin_id=asset["id"]).update(
                image=asset["image"],
                current_price=asset["current_price"],
                market_cap_rank=asset["market_cap_rank"],
                market_cap=asset["market_cap"],
                fully_diluted_valuation=asset["fully_diluted_valuation"],
                total_volume=asset["total_volume"],
                high_24h=asset["high_24h"],
                low_24h=asset["low_24h"],
                price_change_24h=asset["price_change_24h"],
                price_change_percentage_24h=asset["price_change_percentage_24h"],
                market_cap_change_24h=asset["market_cap_change_24h"],
                market_cap_change_percentage_24h=asset["market_cap_change_percentage_24h"],
                circulating_supply=asset["circulating_supply"],
                total_supply=asset["total_supply"],
                max_supply=asset["max_supply"],
                ath=asset["ath"],
                ath_change_percentage=asset["ath_change_percentage"],
                ath_date=asset["ath_date"],
                atl=asset["atl"],
                atl_change_percentage=asset["atl_change_percentage"],
                atl_date=asset["atl_date"],
                last_updated=asset["last_updated"],
                roi=asset["roi"],
            )



        self.stdout.write(f"top 250 updated")
