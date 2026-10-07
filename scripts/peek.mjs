// Recon helper used to collect the copy in lib/content.ts: prints each live page's main text (header, footer and
// cookie banner removed) and its wp-content image URLs. Usage: node scripts/peek.mjs <url> [url...]
import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const u of process.argv.slice(2)) {
  const p = await b.newPage();
  await p.goto(u, { waitUntil: "domcontentloaded", timeout: 45000 }); await p.waitForTimeout(1500);
  const text = await p.evaluate(() => { document.querySelectorAll("header,footer,nav,script,style").forEach((e) => e.remove()); return document.body.innerText.replace(/\n{2,}/g, "\n"); });
  const imgs = await p.evaluate(() => [...new Set([...document.images].map((i) => i.currentSrc || i.src).filter((s) => /uploads/.test(s)))]);
  console.log(`\n######## ${u}\n${text}\nIMGS ${imgs.join(" ")}`);
  await p.close();
}
await b.close();
