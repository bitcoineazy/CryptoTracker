from django.core.management.base import BaseCommand
from users.models import GlobalMetrics

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np

cg = CoinGeckoAPI()


class Command(BaseCommand):
    help = "Update global metrics"

    def handle(self, *args, **options):

        global_data = cg.get_global()
        global_data_df = pd.json_normalize(global_data, max_level=0)

        if not GlobalMetrics.objects.filter(id=1).exists():
            GlobalMetrics.objects.create(
                total_market_cap=global_data_df["total_market_cap"].values[0]["usd"],
                total_volume=global_data_df["total_volume"].values[0]["usd"],
                market_cap_percentage=global_data_df["market_cap_percentage"].values[0],
                market_cap_change_percentage=global_data_df["market_cap_change_percentage_24h_usd"].values[0]
            )
        else:
            GlobalMetrics.objects.filter(id=1).update(
                total_market_cap=global_data_df["total_market_cap"].values[0]["usd"],
                total_volume=global_data_df["total_volume"].values[0]["usd"],
                market_cap_percentage=global_data_df["market_cap_percentage"].values[0],
                market_cap_change_percentage=global_data_df["market_cap_change_percentage_24h_usd"].values[0]
            )

        self.stdout.write(f"{self.help}")
