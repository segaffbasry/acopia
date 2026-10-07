// Records the preloader: screenshots at fixed times after navigation, plus when intro:done fired and whether
// scrolling was locked before it. Usage: node scripts/intro.mjs <outDir> [url]
import { chromium } from "playwright-core";
const [out = "intro", url = "http://127.0.0.1:3048/"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.addInitScript(() => { window.__t0 = performance.now(); document.addEventListener("intro:done", () => { window.__done = performance.now(); }); });
await p.goto(url, { waitUntil: "commit" });
const times = [100, 400, 700, 1000, 1300, 1550, 1800, 2300];
const start = Date.now();
let locked = null;
for (const t of times) {
  const wait = t - (Date.now() - start); if (wait > 0) await p.waitForTimeout(wait);
  if (t === 700) { await p.mouse.wheel(0, 600); await p.waitForTimeout(50); locked = await p.evaluate(() => scrollY === 0); }
  await p.screenshot({ path: `${out}/t${String(t).padStart(4, "0")}.jpg`, type: "jpeg", quality: 60 }).catch(() => {});
}
console.log(JSON.stringify(await p.evaluate(() => ({ introDoneAt: Math.round(window.__done ?? -1), intro: document.documentElement.dataset.intro, loading: document.documentElement.classList.contains("is-loading") })), null, 0), "scrollLockedDuringIntro:", locked);
await b.close();
