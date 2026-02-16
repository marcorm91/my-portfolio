import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_ALLOWED_CHAT_ID;

type TelegramUpdate = {
  message?: {
    chat?: { id?: number };
    text?: string;
  };
};

async function sendTelegramMessage(chatId: number, text: string) {
  if (!TELEGRAM_BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(req: Request) {
  try {
    const update = (await req.json()) as TelegramUpdate;

    const chatId = update.message?.chat?.id;
    const text = update.message?.text ?? "";

    // Responder rápido a Telegram
    const res = NextResponse.json({ ok: true });

    if (!chatId) return res;
    if (!ALLOWED_CHAT_ID || String(chatId) !== String(ALLOWED_CHAT_ID)) return res;

    await sendTelegramMessage(chatId, `✅ Webhook OK: ${text || "(sin texto)"}`);

    return res;
  } catch {
    return NextResponse.json({ ok: true });
  }
}
