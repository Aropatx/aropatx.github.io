// Pobiera najnowsze wydania aplikacji z apps.js i zapisuje je do releases.json.
// Strona czyta ten plik, gdy API GitHuba nie odpowie w przeglądarce (np. limit zapytań).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const ctx = { window: {} };
vm.runInNewContext(readFileSync('apps.js', 'utf8'), ctx);
const apps = Array.isArray(ctx.window.APPS) ? ctx.window.APPS : [];

const out = 'releases.json';
let previous = {};
if (existsSync(out)) {
  try { previous = JSON.parse(readFileSync(out, 'utf8')).apps || {}; } catch { previous = {}; }
}

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'release-snapshot' };
if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;

const cleanVersion = (tag) => {
  const s = String(tag || '').trim();
  const m = s.match(/\d+(?:\.\d+)+[0-9A-Za-z.+-]*/);
  return m ? m[0] : (s.replace(/^v/i, '') || null);
};

const result = {};
let failures = 0;
for (const app of apps) {
  if (!app.repo) continue;
  try {
    const res = await fetch(`https://api.github.com/repos/${app.repo}/releases/latest`, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const j = await res.json();
    const assets = Array.isArray(j.assets) ? j.assets : [];
    const asset = assets.find((a) => a.name === app.asset)
      || assets.find((a) => a.name.toLowerCase() === String(app.asset || '').toLowerCase())
      || assets.find((a) => /\.(exe|msi)$/i.test(a.name));
    if (!asset) console.warn(`${app.id}: brak pliku instalatora w wydaniu`);
    result[app.id] = {
      v: cleanVersion(j.tag_name),
      date: j.published_at || j.created_at || null,
      size: asset ? asset.size : null,
      file: asset ? asset.name : null,
      url: j.html_url || null,
    };
    console.log(`${app.id}: v${result[app.id].v}, ${result[app.id].size} B, ${result[app.id].date}`);
  } catch (e) {
    failures++;
    console.warn(`${app.id}: ${e.message} — zostawiam poprzednie dane`);
    if (previous[app.id]) result[app.id] = previous[app.id];
  }
}

if (failures && failures === apps.filter((a) => a.repo).length) {
  console.error('Nie udało się pobrać żadnego wydania.');
  process.exit(1);
}

writeFileSync(out, JSON.stringify({ apps: result }, null, 2) + '\n');
