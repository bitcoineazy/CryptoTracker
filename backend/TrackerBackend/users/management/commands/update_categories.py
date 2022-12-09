from django.core.management.base import BaseCommand
from users.models import Category

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np

cg = CoinGeckoAPI()


class Command(BaseCommand):
    help = "A description of the command"

    def handle(self, *args, **options):
        update_data = pd.json_normalize(cg.get_coins_categories(), max_level=0)
        for category_id in update_data["id"]:
            remote_category = update_data[update_data["id"] == category_id]

            if not Category.objects.filter(category_id=remote_category["id"].values[0]).exists():
                Category.objects.create(
                    category_id=remote_category["id"].values[0],
                    name=remote_category["name"].values[0],
                    market_cap=remote_category["market_cap"].values[0],
                    market_cap_change_24h=remote_category["market_cap_change_24h"].values[0],
                    content=remote_category["content"].values[0],
                    volume_24h=remote_category["volume_24h"].values[0],
                    last_updated=remote_category["updated_at"].values[0],
                )
            else:
                Category.objects.filter(category_id=remote_category["id"].values[0]).update(
                    category_id=remote_category["id"].values[0],
                    name=remote_category["name"].values[0],
                    market_cap=remote_category["market_cap"].values[0],
                    market_cap_change_24h=remote_category["market_cap_change_24h"].values[0],
                    content=remote_category["content"].values[0],
                    volume_24h=remote_category["volume_24h"].values[0],
                    last_updated=remote_category["updated_at"].values[0],
                )

        self.stdout.write(f"{self.help}")
