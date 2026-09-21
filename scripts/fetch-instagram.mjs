import { mkdir, readFile, writeFile } from "node:fs/promises";

const outputPath = new URL("../assets/data/instagram.json", import.meta.url);
const token = process.env.INSTAGRAM_ACCESS_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;
const apiVersion = process.env.INSTAGRAM_API_VERSION || "v26.0";

if (!token || !userId) {
  console.warn("Instagram não configurado: mantendo os dados estáticos existentes.");
  process.exit(0);
}

const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
const endpoint = new URL(`https://graph.instagram.com/${apiVersion}/${userId}/media`);
endpoint.searchParams.set("fields", fields);
endpoint.searchParams.set("limit", "5");
endpoint.searchParams.set("access_token", token);

try {
  const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error?.message || `Instagram respondeu com HTTP ${response.status}`);
  }

  const posts = (payload.data || []).slice(0, 5).map((post) => ({
    id: post.id,
    caption: post.caption || "Publicação da IEADSAN",
    mediaType: post.media_type,
    imageUrl: post.thumbnail_url || post.media_url,
    permalink: post.permalink,
    timestamp: post.timestamp,
  }));

  await mkdir(new URL("../assets/data/", import.meta.url), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), posts }, null, 2)}\n`);
  console.log(`${posts.length} publicações do Instagram preparadas para o site.`);
} catch (error) {
  // Uma indisponibilidade do Instagram não deve retirar o site do ar.
  try {
    await readFile(outputPath);
    console.warn(`Não foi possível atualizar o Instagram; usando a última versão disponível. ${error.message}`);
  } catch {
    await mkdir(new URL("../assets/data/", import.meta.url), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify({ generatedAt: null, posts: [] }, null, 2)}\n`);
    console.warn(`Instagram indisponível e sem cache anterior. ${error.message}`);
  }
}
