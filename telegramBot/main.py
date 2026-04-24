import telebot
import requests

BOT_TOKEN = "7780379541:AAHjpvmXg4-VDoENfEk6jvolXSaw5tM58Ao"

# ВАЖНО: имя сервиса из compose + внутренний порт
API_URL = "http://backend0:8000/notion"

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=["notion"])
def show_notion(message):
    r = requests.get(API_URL)
    data = r.json()["notion"]

    text = "\n\n".join([f"{i[1]}: {i[2]}" for i in data])
    bot.reply_to(message, text)

bot.infinity_polling()