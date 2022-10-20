from telegram import bot
from telegram.ext import Updater, CallbackContext, MessageHandler, Filters
from telegram.ext import CommandHandler
from tracker import get_prices
from telegram import *
import requests
import telebotb

telegram_bot_token = "5757369788:AAEosq7Kzkvmvl6nw-2wT-qxkEGRM9kDBPM"

updater = Updater(token=telegram_bot_token, use_context=True)
dispatcher = updater.dispatcher


def startCommand(update: Update, context: CallbackContext):
    buttons = [[KeyboardButton("Показать все курсы")], [KeyboardButton("Показать конкретную монету")],
               [KeyboardButton("Ввести свои моенты")], [KeyboardButton("показать мои монеты")]
               ]
    context.bot.send_message(chat_id=update.effective_chat.id, text="Введите команду !",
                             reply_markup=ReplyKeyboardMarkup(buttons))

def messageHandler(update: Update, context: CallbackContext):
    if "Показать все курсы" in update.message.text:
        all_currency(update,context)
    if "Показать конкретную монету" in update.message.text:
        context.bot.send_message(chat_id=update.effective_chat.id, text="------")



def all_currency(update, context):
    chat_id = update.effective_chat.id
    message = ""
    smile = ""
    crypto_data = get_prices()
    for i in crypto_data:
        coin = crypto_data[i]["coin"]
        price = crypto_data[i]["price"]
        change_day = crypto_data[i]["change_day"]
        change_hour = crypto_data[i]["change_hour"]
        if (change_day < 0):
            smile = "📉"
        else:
            smile = "📈"
        message += f"Монета: {coin + smile}\nЦена: ${price:,.2f}\nИзменение за час: {change_hour:.3f}%\nИзменение за день: {change_day:.3f}%\n\n"

    context.bot.send_message(chat_id=chat_id, text=message)


dispatcher.add_handler(CommandHandler("start", startCommand))
dispatcher.add_handler(MessageHandler(Filters.text, messageHandler))
updater.start_polling()
