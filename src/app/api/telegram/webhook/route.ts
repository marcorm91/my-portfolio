import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export const runtime = "nodejs";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_ALLOWED_CHAT_ID!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!; // "owner/repo"
const GITHUB_DEFAULT_BRANCH = process.env.GITHUB_DEFAULT_BRANCH || "main";

type TelegramUpdate = {
  message?: {
    chat?: { id?: number };
    text?: string;
    caption?: string;
    document?: {
      file_id: string;
      file_name?: string;
      file_size?: number;
      mime_type?: string;
    };
  };
};

async function telegramSendMessage(chatId: number, text: string) {
  if (!TELEGRAM_BOT_TOKEN) return;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });
}

function toBase64(str: string) {
  return Buffer.from(str, "utf8").toString("base64");
}

function extractBetween(text: string, startMark: string, endMark: string) {
  const start = text.indexOf(startMark);
  const end = text.indexOf(endMark);
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start + startMark.length, end).trim();
}

function extractMdxBlock(sectionText: string) {
  const mdx = extractBetween(sectionText, "---MDX_START---", "---MDX_END---");
  if (!mdx) throw new Error("Falta bloque ---MDX_START--- / ---MDX_END--- dentro de la sección.");
  return mdx.trim();
}

function parseFilenameFromPrCommand(text: string): string | null {
  const firstLine = (text.split("\n")[0] || "").trim();
  if (!firstLine.startsWith("/pr")) return null;
  return firstLine.match(/filename=([A-Za-z0-9-_.]+\.mdx)/)?.[1] ?? null;
}

function parseSlugFromMdx(mdx: string): string | null {
  const match = mdx.match(/slug:\s*["']?([A-Za-z0-9-_]+)["']?/);
  return match?.[1] ?? null;
}

function parseLocaleFromMdx(mdx: string): "es" | "en" | null {
  const match = mdx.match(/locale:\s*["']?(es|en)["']?/);
  return (match?.[1] as "es" | "en") ?? null;
}

async function telegramGetFilePath(fileId: string): Promise<string> {
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ file_id: fileId }),
  });

  const json = (await res.json()) as any;
  const filePath = json?.result?.file_path as string | undefined;
  if (!filePath) throw new Error("No se pudo obtener file_path desde Telegram getFile()");
  return filePath;
}

async function telegramDownloadFileText(filePath: string): Promise<string> {
  const url = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar el archivo: ${res.status} ${res.statusText}`);
  return await res.text();
}

async function createBilingualPullRequest(params: {
  filename: string; // mismo filename para ES y EN
  mdxEs: string;
  mdxEn: string;
  branchSlug: string;
}) {
  const { filename, mdxEs, mdxEn, branchSlug } = params;

  const filePathEs = `content/es/${filename}`;
  const filePathEn = `content/en/${filename}`;

  const [owner, repo] = GITHUB_REPO.split("/");
  if (!owner || !repo) throw new Error("GITHUB_REPO inválido. Debe ser 'owner/repo'.");

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  // 1) SHA del branch base
  const baseRef = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${GITHUB_DEFAULT_BRANCH}`,
  });
  const baseSha = baseRef.data.object.sha;

  // 2) Crear branch (si existe, sufijo timestamp)
  let branchName = `post/${branchSlug}`;
  try {
    await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branchName}`, sha: baseSha });
  } catch {
    branchName = `post/${branchSlug}-${Date.now()}`;
    await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branchName}`, sha: baseSha });
  }

  // 3) Crear/actualizar ambos archivos en la misma rama
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePathEs,
    message: `content: add ${filename} (es)`,
    content: toBase64(mdxEs),
    branch: branchName,
  });

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePathEn,
    message: `content: add ${filename} (en)`,
    content: toBase64(mdxEn),
    branch: branchName,
  });

  // 4) Crear PR con ambos cambios
  const prTitle = `Post: ${branchSlug} (es+en)`;
  const prBody =
    `Añade post bilingüe:\n- \`${filePathEs}\`\n- \`${filePathEn}\`\n\n` +
    `Checklist:\n- [ ] Revisar copy ES\n- [ ] Revisar copy EN\n- [ ] Revisar tags/minutes\n- [ ] Revisar coverAlt/SEO\n`;

  const pr = await octokit.pulls.create({
    owner,
    repo,
    title: prTitle,
    head: branchName,
    base: GITHUB_DEFAULT_BRANCH,
    body: prBody,
  });

  return pr.data.html_url;
}

export async function POST(req: Request) {
  const res = NextResponse.json({ ok: true });
  let chatId: number | undefined;

  try {
    const update = (await req.json()) as TelegramUpdate;

    chatId = update.message?.chat?.id;
    if (!chatId) return res;
    if (String(chatId) !== String(ALLOWED_CHAT_ID)) return res;

    const caption = update.message?.caption ?? "";
    const doc = update.message?.document;

    // En este modo: SOLO archivo .txt (bilingüe obligatorio)
    if (!doc) {
      await telegramSendMessage(
        chatId,
        "❌ Envíame un archivo .txt bilingüe (ES+EN). Debe incluir /pr filename=... y bloques ---ES_START---/---EN_START---."
      );
      return res;
    }

    const fileName = (doc.file_name ?? "").toLowerCase();
    if (!fileName.endsWith(".txt")) {
      await telegramSendMessage(chatId, "❌ El archivo debe ser .txt (por ejemplo: post.txt).");
      return res;
    }

    // Tamaño máximo razonable
    if (doc.file_size && doc.file_size > 600_000) {
      await telegramSendMessage(chatId, "❌ Archivo demasiado grande. Reduce tamaño o divide el post.");
      return res;
    }

    // Descargar txt
    const filePath = await telegramGetFilePath(doc.file_id);
    const fileText = await telegramDownloadFileText(filePath);

    // El comando /pr puede venir en caption o dentro del archivo (primera línea)
    const merged = caption.trim().startsWith("/pr") ? `${caption}\n${fileText}` : fileText;

    // ✅ Si el /pr no se detecta por BOM o espacios invisibles, ponemos fallback:
    const trimmedStart = merged.replace(/^\uFEFF/, "").trimStart();
    const mergedSafe = trimmedStart.startsWith("/pr") ? trimmedStart : merged;

    const filenameParam = parseFilenameFromPrCommand(mergedSafe);
    if (!filenameParam) {
      await telegramSendMessage(
        chatId,
        '❌ Falta "/pr filename=..." (en el caption o como primera línea del txt).'
      );
      return res;
    }

    // Extraer secciones ES/EN (obligatorias)
    const esSection = extractBetween(mergedSafe, "---ES_START---", "---ES_END---");
    const enSection = extractBetween(mergedSafe, "---EN_START---", "---EN_END---");

    if (!esSection || !enSection) {
      await telegramSendMessage(
        chatId,
        "❌ Formato inválido. Debe incluir ---ES_START---...---ES_END--- y ---EN_START---...---EN_END---."
      );
      return res;
    }

    const mdxEs = extractMdxBlock(esSection);
    const mdxEn = extractMdxBlock(enSection);

    // Validaciones: locale correcto en cada bloque
    const locEs = parseLocaleFromMdx(mdxEs);
    const locEn = parseLocaleFromMdx(mdxEn);
    if (locEs !== "es") throw new Error("El bloque ES debe tener `locale: es` en el frontmatter.");
    if (locEn !== "en") throw new Error("El bloque EN debe tener `locale: en` en el frontmatter.");

    // Slug: recomendado igual (lo hacemos obligatorio)
    const slugEs = parseSlugFromMdx(mdxEs);
    const slugEn = parseSlugFromMdx(mdxEn);

    if (!slugEs || !slugEn) throw new Error("Ambos bloques deben incluir `slug:` en el frontmatter.");
    if (slugEs !== slugEn) throw new Error("Los slugs ES y EN deben ser iguales.");

    const branchSlug = slugEs.toLowerCase();

    // Crear PR con 2 archivos
    const prUrl = await createBilingualPullRequest({
      filename: filenameParam,
      mdxEs,
      mdxEn,
      branchSlug,
    });

    await telegramSendMessage(chatId, `✅ PR creada (ES+EN): ${prUrl}`);
    return res;
  } catch (e: any) {
    if (chatId && String(chatId) === String(ALLOWED_CHAT_ID)) {
      await telegramSendMessage(chatId, `❌ Error: ${e?.message ?? String(e)}`);
    }
    return res;
  }
}
