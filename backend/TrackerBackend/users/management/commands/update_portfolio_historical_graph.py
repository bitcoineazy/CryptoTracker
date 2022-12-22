from django.core.management.base import BaseCommand
from users.models import UserPortfolio, Asset, CryptoUser

from pycoingecko import CoinGeckoAPI
import pandas as pd
import numpy as np
import time
from datetime import datetime

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
                    assets_in_portfolio_set = set()
                    assets_value = {}
                    historical_graph = {}
                    assets_timeline = {}  # {'25-11-2022': [{'ethereum': Decimal('1.6000000000')}], '27-11-2022': [{'bitcoin': Decimal('0.5000000000')}, {'ethereum': Decimal('6.5000000000')}],
                    for asset in portfolio.assets.all():
                        print(portfolio.name, asset.amount, asset.price, int(time.mktime(asset.add_date.timetuple())),
                              asset.add_date.strftime("%d-%m-%Y"))
                        if not asset.add_date.strftime("%d-%m-%Y") in assets_timeline.keys():
                            assets_timeline[asset.add_date.strftime("%d-%m-%Y")] = [{asset.asset.coin_id: asset.amount}]
                        else:
                            if not any([item.get(asset.asset.coin_id) for item in
                                        assets_timeline[asset.add_date.strftime("%d-%m-%Y")]]):
                                assets_timeline[asset.add_date.strftime("%d-%m-%Y")].append(
                                    {asset.asset.coin_id: asset.amount})
                            else:
                                suitable_keys = [item.get(asset.asset.coin_id) for item in
                                                 assets_timeline[asset.add_date.strftime("%d-%m-%Y")]]
                                index_to_change = np.where(suitable_keys)[0][0]
                                # old_amount = historical_graph[asset.add_date.strftime("%d-%m-%Y")][index_to_change][asset.asset.coin_id]
                                assets_timeline[asset.add_date.strftime("%d-%m-%Y")][index_to_change][
                                    asset.asset.coin_id] += asset.amount

                        # print(asset.asset.coin_id)
                        start_portfolio_equity += asset.amount * asset.price
                        assets_in_portfolio_set.add(asset.asset.coin_id)
                        if not asset.asset.coin_id in assets_value.keys():
                            assets_value[asset.asset.coin_id] = asset.amount
                        else:
                            assets_value[asset.asset.coin_id] += asset.amount

                    historical_api_dict = {}
                    asset_amounts_for_api = {}
                    for date, assets_list in assets_timeline.items():
                        print(f"asset_amounts {date}, {assets_list}")
                        for item in assets_list:
                            for coin_id, asset_amount in item.items():

                                print(coin_id, asset_amount)
                                print(time.mktime(datetime.strptime(date, "%d-%m-%Y").timetuple()))
                                print(datetime.now())
                                # if not coin_id in asset_amounts_for_api.keys():
                                #     asset_amounts_for_api[coin_id] = asset_amount
                                #     # asset_amounts_for_api[coin_id] = assets_timeline[]
                                #
                                # else:
                                #     asset_amounts_for_api[coin_id] += asset_amount
                                print(f"dynamic asset_amounts: {asset_amounts_for_api}")
                                if not coin_id in historical_api_dict.keys():
                                    days_set = []
                                    coin_market_range = pd.json_normalize(
                                        cg.get_coin_market_chart_range_by_id(id=coin_id, vs_currency="usd",
                                                                             from_timestamp=time.mktime(
                                                                                 datetime.strptime(date,
                                                                                                   "%d-%m-%Y").timetuple()),
                                                                             to_timestamp=time.mktime(
                                                                                 datetime.now().timetuple())),
                                        max_level=0)
                                    for pair in coin_market_range["prices"].values[0]:
                                        # print(pair[0])
                                        date = datetime.fromtimestamp(pair[0] / 1000).strftime("%d-%m-%Y")
                                        if date not in days_set:
                                            days_set.append(date)
                                            # print(days_set)
                                            # if date not in days_set:
                                            print(date, pair[1])
                                            # if coin_id not in historical_api_dict
                                            print(f"assets_amount coin_id: {coin_id}, {asset_amount}")
                                            print(f"assets_timeline dynamic: {assets_timeline}")
                                            if not coin_id in asset_amounts_for_api.keys():
                                                if date in assets_timeline.keys():
                                                    suitable_keys = [item.get(coin_id) for item in
                                                                     assets_timeline[date]]
                                                    suitable_index = np.where(suitable_keys)[0][0]

                                                    asset_amounts_for_api[coin_id] = \
                                                    assets_timeline[date][suitable_index][coin_id]
                                                    # asset_amounts_for_api[coin_id] = assets_timeline[]

                                            else:
                                                if date in assets_timeline.keys():
                                                    suitable_keys = [item.get(coin_id) for item in
                                                                     assets_timeline[date]]
                                                    suitable_index = np.where(suitable_keys)[0][0]

                                                    asset_amounts_for_api[coin_id] += \
                                                    assets_timeline[date][suitable_index][coin_id]
                                            if not coin_id in historical_api_dict.keys():
                                                print(f"pair {pair[0]} {pair[1]}")
                                                if coin_id in asset_amounts_for_api.keys():
                                                    historical_api_dict[coin_id] = [
                                                        {date: pair[1] * float(asset_amounts_for_api[coin_id])}]
                                            else:
                                                print(f"pair {pair[0]} {pair[1]}")
                                                if coin_id in asset_amounts_for_api.keys():
                                                    print(
                                                        f"dynamic amount for now: {float(asset_amounts_for_api[coin_id])}")
                                                    historical_api_dict[coin_id].append(
                                                        {date: pair[1] * float(asset_amounts_for_api[coin_id])})
                    print(f"total portfolio equity: {start_portfolio_equity}")
                    print(f"assets_in_portfolio_set: {assets_in_portfolio_set}")
                    print(f"assets_amount: {assets_value}")
                    print(f"assets_amounts_for_api: {asset_amounts_for_api}")

                    final_equity = 0
                    for coin_id, amount in assets_value.items():
                        final_equity += amount * Asset.objects.get(coin_id=coin_id).current_price
                    print(f"final equity: {final_equity}")
                    print(f"historical_graph: {assets_timeline}")
                    print(f"historical_api_dict: {historical_api_dict}")

                    final_prices_timeline = {}  # {'25-11-2022': 1927.0037655599988, '26-11-2022': 1919.6827565408585, '27-11-2022': 18004.724214232752,
                    for coin_id, historical_data in historical_api_dict.items():
                        for historical_item in historical_data:
                            for date, amount in historical_item.items():
                                if not date in final_prices_timeline.keys():
                                    final_prices_timeline[date] = float(amount)
                                else:
                                    final_prices_timeline[date] += float(amount)
                    print(f"final_prices_timeline: {final_prices_timeline}")
                    final_portfolio_graph = {"id": "graph", "data": []}
                    for date, equity in final_prices_timeline.items():
                        # print(date, equity)
                        final_portfolio_graph["data"].append({"x": date, "y": equity})
                    print(f"final_portfolio_graph: {final_portfolio_graph}")
                    portfolio.portfolio_change_metrics = {"final_equity": float(final_equity)}
                    portfolio.portfolio_historical_graph = final_portfolio_graph
                    portfolio.save()

        self.stdout.write(f"statistics")
