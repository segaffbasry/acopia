import Image from "next/image";
import Story from "@/components/home/Story";
import { Arrow, Ext } from "@/components/ui";
import { trusted } from "@/lib/content";

// "50,000" and "5,000+" count up; a year like 1976 stays as it is.
const countAttrs = (value: string) => {
  const m = value.match(/^([\d,]+)(\+?)$/);
  const n = m ? Number(m[1].replace(/,/g, "")) : NaN;
  return m && n >= 2000 && !/^(19|20)\d\d$/.test(value) ? { "data-count": n, "data-suffix": m[2] } : {};
};

/* 50 years in one place: the Bognor Regis building, the live copy, key facts from Who We Are, the twelve client
   logos from the live strip, and the Our Story timeline. */
export default function Trusted() {
  return (
    <section className="section" id="trusted" data-tone="dark" aria-labelledby="trusted-title">
      <div className="wrap">
        <div className="trusted">
          <div className="media" data-reveal="image" data-parallax="">
            <Image src={trusted.image.src} alt={trusted.image.alt} width={trusted.image.w} height={trusted.image.h} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="h2" id="trusted-title" data-reveal="heading">{trusted.title}</h2>
            {trusted.body.map((p) => <p className="body" key={p.slice(0, 20)} data-reveal="text">{p}</p>)}
            <dl className="facts">
              {trusted.facts.map((f) => <div key={f.value} data-reveal="card"><dt className="sr-only">{f.text}</dt><dd style={{ margin: 0 }}><strong {...countAttrs(f.value)}>{f.value}</strong><span>{f.text}</span></dd></div>)}
            </dl>
            <Ext className="link" href={trusted.more.href} data-reveal="fade">{trusted.more.label} <Arrow /></Ext>
          </div>
        </div>
        <ul className="logos" aria-label="Retailers and charities working with Acopia">
          {trusted.logos.map((l) => (
            <li key={l.name} data-reveal="card"><Image src={l.src} alt={l.name} width={l.w} height={l.h} sizes="120px" /></li>
          ))}
        </ul>
        <Story />
      </div>
    </section>
  );
}
