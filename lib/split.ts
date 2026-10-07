// Line masks for paragraph reveals. Splits an element's text into words, groups the words into the lines the
// browser actually laid out, and wraps each line in an overflow mask so it can rise into view. `restore` puts
// the original markup back once the reveal has played, so later resizes reflow normally.
export function splitLines(el: HTMLElement) {
  const original = el.innerHTML;
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="sl-w">${w.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`).join(" ");
  const lines: HTMLElement[][] = [];
  let top = -1;
  el.querySelectorAll<HTMLElement>(".sl-w").forEach((w) => {
    if (Math.abs(w.offsetTop - top) > 2) { lines.push([]); top = w.offsetTop; }
    lines[lines.length - 1].push(w);
  });
  el.innerHTML = lines.map((line) => `<span class="sl-mask"><span class="sl-line">${line.map((w) => w.innerHTML).join(" ")}</span></span>`).join(" ");
  return { lines: Array.from(el.querySelectorAll<HTMLElement>(".sl-line")), restore: () => { el.innerHTML = original; } };
}
