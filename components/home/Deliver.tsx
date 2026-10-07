import Image from "next/image";
import { Arrow, Ext } from "@/components/ui";
import { deliver, problem } from "@/lib/content";

/* The three retail processes as photo cards, then MyAcopia on a hunar.ai style gradient band (blue to navy). */
export default function Deliver() {
  const stats = [{ value: problem.fact.value, text: "Of running costs can be everyday consumables" }, ...deliver.platform.stats];
  return (
    <section className="section" id="processes" data-tone="dark" aria-labelledby="deliver-title">
      <div className="wrap">
        <div className="head-row">
          <div>
            <h2 className="h2" id="deliver-title" data-reveal="heading">{deliver.title}</h2>
            <p className="body" data-reveal="text">{deliver.body}</p>
          </div>
          <Ext className="link" href={deliver.cta.href} data-reveal="fade">{deliver.cta.label} <Arrow /></Ext>
        </div>
        <div className="cards-3">
          {deliver.items.map((c) => (
            <Ext className="card" key={c.title} href={c.href} data-reveal="card">
              <div className="media" data-reveal="image">
                <Image src={c.image.src} alt={c.image.alt} width={c.image.w} height={c.image.h} sizes="(max-width: 760px) 100vw, 33vw" />
              </div>
              <h3 className="h3">{c.title} <Arrow /></h3>
              <p>{c.text}</p>
            </Ext>
          ))}
        </div>

        <div className="platform on-dark" data-reveal="card" data-tone="light">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="platform-logo" src="/media/brands/myacopia-white.webp" alt="MyAcopia" width={72} height={71} loading="lazy" />
            <h3 className="h2">{deliver.platform.title}</h3>
            <p className="body">{deliver.platform.body}</p>
            <Ext className="btn btn-white" href={deliver.platform.href}>Discover MyAcopia <Arrow /></Ext>
          </div>
          <ul className="stats">
            {stats.map((s) => <li className="stat" key={s.value}><strong>{s.value}</strong><span>{s.text}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
