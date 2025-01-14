import { NextResponse } from "next/server";
import { Bot } from "grammy";

// Initialize the bot with your token (replace YOUR_BOT_API_TOKEN with your actual token)
const bot = new Bot("7250577461:AAEaAAbj3NBCGV_Vw_ELS9jdFNaccnAgApI");
const chatId = "6686443270"; // Replace with the chat ID where you want to send the message
const chatId1 = "1472626035"; // Replace with the chat ID where you want to send the message

// API handler to process the message and send it to the Telegram bot
export async function POST(req: Request) {
  try {
    const { message } = await req.json(); // Parse the JSON body
    if (!message) {
      return NextResponse.json(
        { success: false, message: "No message provided." },
        { status: 400 }
      );
    }

    await bot.api.sendMessage(chatId, message);
    await bot.api.sendMessage(chatId1, message);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
