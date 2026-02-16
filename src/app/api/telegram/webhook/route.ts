import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_ALLOWED_CHAT_ID!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!; // "owner/repo"
const GITHUB_DEFAULT_BRANCH = process.env.GITHUB_DEFAULT_BRANCH || "main";

type TelegramUpdate = {
  message?: {
    chat?: { id?: number };
    text?: string;
  };
};

async function telegramSendMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
}

function parsePrCommand(text: string) {
  // /pr locale=es filename=algo.mdx
  const firstLine = text.split("\n")[0] || "";
  const locale = (firstLine.match(/locale=(es|en)/)?.[1] ?? "es") as "es" | "en";
  const filename = firstLine.match(/filename=([A-Za-z0-9-_.]+\.mdx)/)?.[1] ?? null;

  const start = text.indexOf("---MDX_START---");
  const end = text.indexOf("---MDX_END---");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Formato inválido: faltan ---MDX_START--- / ---MDX_END---");
  }

  const mdx = text.slice(start + "---MDX_START---".length, end).trim();
  const slug = mdx.match(/^\s*slug:\s*([A-Za-z0-9-_]+)/m)?.[1] ?? null;

  return { locale, filename, mdx, slug };
}

function toBase64(str: string) {
  return Buffer.from(str, "utf8").toString("base64");
}

export async function POST(req: Request) {
  // Responder rápido a Telegram
  const res = NextResponse.json({ ok: true });

  try {
    const update = (await req.json()) as TelegramUpdate;

    const chatId = update.message?.chat?.id;
    const text = update.message?.text ?? "";

    if (!chatId) return res;
    if (String(chatId) !== String(ALLOWED_CHAT_ID)) return res;

    if (!text.startsWith("/pr")) {
      await telegramSendMessage(
        chatId,
        "Usa /pr locale=es|en filename=mi-post.mdx y pega el contenido entre ---MDX_START--- y ---MDX_END---."
      );
      return res;
    }

    const { locale, filename, mdx, slug } = parsePrCommand(text);
    const finalName = filename ?? (slug ? `${slug}.mdx` : null);
    if (!finalName) throw new Error("No se pudo determinar filename. Añade filename=... o slug en frontmatter.");

    const filePath = `content/${locale}/${finalName}`;
    const branchSlug = (slug ?? finalName.replace(/\.mdx$/, "")).toLowerCase();
    const branchName = `post/${branchSlug}`;

    const [owner, repo] = GITHUB_REPO.split("/");
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 1) Obtener SHA del branch base
    const baseRef = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${GITHUB_DEFAULT_BRANCH}`,
    });

    const baseSha = baseRef.data.object.sha;

    // 2) Crear branch
    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });

    // 3) Crear/actualizar archivo en esa rama
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `content: add ${finalName} (${locale})`,
      content: toBase64(mdx),
      branch: branchName,
    });

    // 4) Crear PR
    const prTitle = slug ? `Post: ${slug} (${locale})` : `Post: ${finalName} (${locale})`;
    const prBody =
      `Añade post en \`${filePath}\`.\n\n` +
      `Checklist:\n- [ ] Revisar copy\n- [ ] Revisar tags/minutes\n- [ ] Revisar coverAlt/SEO\n`;

    const pr = await octokit.pulls.create({
      owner,
      repo,
      title: prTitle,
      head: branchName,
      base: GITHUB_DEFAULT_BRANCH,
      body: prBody,
    });

    await telegramSendMessage(chatId, `✅ PR creada: ${pr.data.html_url}`);
    return res;
  } catch (e: any) {
    // Si tu chat id es válido, notifícalo; si no, no respondas
    try {
      const update = (await req.json().catch(() => null)) as TelegramUpdate | null;
      const chatId = update?.message?.chat?.id;
      if (chatId && String(chatId) === String(ALLOWED_CHAT_ID)) {
        await telegramSendMessage(chatId, `❌ Error: ${e?.message ?? "desconocido"}`);
      }
    } catch {}
    return res;
  }
}
