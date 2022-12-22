import logging
from aiogram import Bot, types
from aiogram.types import Message
from aiogram.dispatcher import Dispatcher
from aiogram.utils import executor
from pycoingecko import CoinGeckoAPI
from utils import TestStates
from messages import MESSAGES
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.contrib.middlewares.logging import LoggingMiddleware
import time
from login import users

logging.basicConfig(format=u'%(filename)+13s [ LINE:%(lineno)-4s] %(levelname)-8s [%(asctime)s] %(message)s',
                    level=logging.DEBUG)

cg = CoinGeckoAPI()
TOKEN = '5872766896:AAESvBFIvEQA-XeG59JX23agNAgBJhfhpkA'

bot = Bot(token=TOKEN)
dp = Dispatcher(bot, storage=MemoryStorage())
dp.middleware.setup(LoggingMiddleware())


async def get_coin_price(coin: str):
    ticker_data = await cg.get_price(ids=coin, vs_currencies='usd')
    return ticker_data[coin]['usd']


async def update_coin_price(message: Message, coin: str):
    while True:
        new_price = await get_coin_price(coin)
        await message.edit_text(text=new_price)
        time.sleep(5)


@dp.message_handler(commands=['start'])
async def process_start_command(message: types.Message):
    await message.reply(MESSAGES['start'])


@dp.message_handler(commands=['help'])
async def process_help_command(message: types.Message):
    await message.reply(MESSAGES['help'])

@dp.message_handler(commands=['cap'])
async def process_help_command(message: types.Message):
    global result
    data = cg.get_coins_markets(vs_currency='usd')
    k = []
    r = []
    y = []
    s = []
    stroka = ''
    list_2 = []

    x = 0

    low = '📉'
    high = '📈'

    for i in data:
        x += 1
        i['id'] = i['id'].upper()

        if i['price_change_24h'] > 0:
            i['id'] = i['id'] + high
        elif i['price_change_24h'] < 0:
            i['id'] = i['id'] + low

        string = i['id'], 'Цена:', i['current_price'], 'Объём:', i['market_cap'], 'Изменение[сутки]:', i[
            'price_change_24h']

        list_2.append(string)
        if x == 10:
            break

    for i in list_2:
        k.append(str(i).replace('(', ''))
    for j in k:
        r.append(str(j).replace(')', ''))
    for x in r:
        y.append(str(x).replace(',', ''))
    for z in y:
        s.append(str(z).replace(' ', ''))
    for e in s:
        stroka = stroka + '\n' + str(e).replace("'", '\n')

    await message.answer(stroka)


#message.answer(x)

@dp.message_handler(state='*', commands=['lookfor'])
async def process_setstate_command(message: types.Message):
    argument = message.get_args()
    state = dp.current_state(user=message.from_user.id)
    if not argument:
        await state.reset_state()
        return await message.reply(MESSAGES['state_reset'])

    if (not argument.isdigit()) or (not int(argument) < len(TestStates.all())):
        return await message.reply(MESSAGES['invalid_key'].format(key=argument))

    await state.set_state(TestStates.all()[int(argument)])
    # await message.reply(MESSAGES['state_change'], reply=False)


@dp.message_handler(state=TestStates.TEST_STATE_1)
async def own_crypto(message: types.Message):
    x = message.text
    price = cg.get_price(ids=x, vs_currencies='usd')
    price = price[x]['usd']
    await bot.send_message(message.from_user.id, price)


@dp.message_handler(state=TestStates.TEST_STATE_2)
async def second_test_state_case_met(message: types.Message):
    price = await get_coin_price(coin=message.text)
    reply_message = await message.reply(text=price)
    await update_coin_price(message=reply_message, coin=message.text)


@dp.message_handler(state=TestStates.TEST_STATE_3 | TestStates.TEST_STATE_4)
async def third_or_fourth_test_state_case_met(message: types.Message):
    await message.reply('Третий или четвертый!', reply=False)


@dp.message_handler(state=TestStates.all())
async def some_test_state_case_met(message: types.Message):
    with dp.current_state(user=message.from_user.id) as state:
        text = MESSAGES['current_state'].format(
            current_state=await state.get_state(),
            states=TestStates.all()
        )
    await message.reply(text, reply=False)


@dp.message_handler(commands=['own'])
async def echo_message(msg: types.Message):
    await msg.reply("Listening: ")
    x = msg.text
    print(x)
    price = cg.get_price(ids=x, vs_currencies='usd')
    price = price[x]['usd']
    await bot.send_message(msg.from_user.id, price)


async def shutdown(dispatcher: Dispatcher):
    await dispatcher.storage.close()
    await dispatcher.storage.wait_closed()


if __name__ == '__main__':
    executor.start_polling(dp)
