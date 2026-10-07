import Image from "next/image";
import { Arrow, Ext } from "@/components/ui";
import { challenges } from "@/lib/content";

/* The live "Challenges Retailers Face" four, as photo cards that link to each challenge page. */
export default function Challenges() {
  return (
    <section className="section" id="challenges" data-tone="dark" aria-labelledby="challenges-title">
      <div className="wrap">
        <div className="head-row">
          <h2 className="h2" id="challenges-title" data-reveal="heading">{challenges.title}</h2>
          <Ext className="link" href={challenges.more.href} data-reveal="fade">{challenges.more.label} <Arrow /></Ext>
        </div>
        <div className="cards-4">
          {challenges.items.map((c) => (
            <Ext className="card" key={c.title} href={c.href} data-reveal="card">
              <div className="media" data-reveal="image">
                <Image src={c.image.src} alt={c.image.alt} width={c.image.w} height={c.image.h} sizes="(max-width: 520px) 100vw, (max-width: 1020px) 50vw, 25vw" />
              </div>
              <h3 className="h3">{c.title} <Arrow /></h3>
              <p>{c.text}</p>
            </Ext>
          ))}
        </div>
      </div>
    </section>
  );
}
