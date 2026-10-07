import Image from "next/image";
import { Arrow, Check, Ext } from "@/components/ui";
import { maturity, problem } from "@/lib/content";

/* Why the category matters (copy, pain points) beside the Retail Consumables Maturity Index invitation. */
export default function Problem() {
  return (
    <section className="section" data-tone="dark" aria-labelledby="problem-title">
      <div className="wrap problem">
        <div>
          <h2 className="h2" id="problem-title" data-reveal="heading">{problem.title}</h2>
          <p className="kicker" data-reveal="fade">{problem.kicker}</p>
          {problem.body.map((p) => <p className="body" key={p.slice(0, 20)} data-reveal="text">{p}</p>)}
          <h3 className="pains-title" data-reveal="fade">{problem.painTitle}</h3>
          <ul className="pains">
            {problem.pains.map((p) => <li key={p} data-reveal="card"><Check />{p}</li>)}
          </ul>
        </div>
        <aside className="maturity" aria-labelledby="maturity-title" data-reveal="card">
          <div className="shot">
            <Image src={maturity.image.src} alt={maturity.image.alt} width={maturity.image.w} height={maturity.image.h} sizes="300px" />
          </div>
          <h3 className="h3" id="maturity-title">{maturity.title}</h3>
          <p className="body">{maturity.body}</p>
          <div><Ext className="btn btn-primary" href={maturity.cta.href}>{maturity.cta.label} <Arrow /></Ext></div>
        </aside>
      </div>
    </section>
  );
}
