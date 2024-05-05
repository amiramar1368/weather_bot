import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

import { makeImage } from "./service/weather.js";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [["Mashhad", "Yazd", "Neyshabur"], ["London", "Paris", "Tehran"], ["type every city after / char"]],
      resize_keyboard: true,
    }),
  };
  bot.sendMessage(chatId, "Please choose an option:", opts);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if(messageText.toLowerCase().includes("start")){
    return;
  }
  switch (messageText) {
    case "Neyshabur":
      bot.sendPhoto(chatId, await makeImage("Neyshabur"), { caption: "city : Neyshabur" });
      break;
    case "Mashhad":
      bot.sendPhoto(chatId, await makeImage("Mashhad"), { caption: "city : Mashhad" });
      break;
    case "Yazd":
      bot.sendPhoto(chatId, await makeImage("Yazd"), { caption: "city : Yazd" });
      break;
    case "Tehran":
      bot.sendPhoto(chatId, await makeImage("Tehran"), { caption: "city : Tehran" });
      break;
    case "London":
      bot.sendPhoto(chatId, await makeImage("London"), { caption: "city : London" });
      break;
    case "Paris":
      bot.sendPhoto(chatId, await makeImage("Paris"), { caption: "city : Paris" });
      break;
    case "type every city after / char":
      bot.sendMessage(chatId, "type every city after / char for example /Washington");
      break;
    default:
      bot.sendPhoto(chatId, await makeImage(messageText), { caption: `city : ${messageText}` });
      break;
  }
});
