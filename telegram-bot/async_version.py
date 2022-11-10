from aiogram import Bot, executor, Dispatcher
from aiogram.types import Message
import aiohttp
from aiohttp import ClientSession
import sys
from binance import AsyncClient
import asyncio

from binance.exceptions import BinanceAPIException

bot = Bot('5757369788:AAEosq7Kzkvmvl6nw-2wT-qxkEGRM9kDBPM')
dispatcher = Dispatcher(bot)
binance_client = AsyncClient()

async def get_coin_price(coin: str):
    #try:
    ticker_data = await binance_client.get_ticker(symbol=coin, verify=False)
    return ticker_data['lastPrice']
    #except BinanceAPIException:
      #  raise ValueError("Нет такой пары")

async def update_coin_price(message: Message, coin:str):
    while True:
        new_price = await get_coin_price(coin)
        await message.edit_text(text=new_price)
        await asyncio.sleep(5)

@dispatcher.message_handler()
async def handle_coin_price(message: Message):
    #try:
    price = await get_coin_price(coin=message.text)
    reply_message = await message.reply(text=price)
    await update_coin_price(message=reply_message, coin=message.text)
    #except ValueError:
        #await message.reply(text="Нет такой пары")


if __name__ == '__main__':
    executor.start_polling(dispatcher)
