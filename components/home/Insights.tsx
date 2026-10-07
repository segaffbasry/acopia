import Image from "next/image";
import { Arrow, Ext } from "@/components/ui";
import { insights } from "@/lib/content";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/* The four insights the live homepage features, linking to the full articles on acopia.co.uk. */
export default function Insights() {
  return (
    <section className="section" id="insights" data-tone="dark" data-late="" aria-labelledby="insights-title">
      <div className="wrap">
        <div className="head-row">
          <h2 className="h2" id="insights-title" data-reveal="heading">{insights.title}</h2>
          <Ext className="link" href={insights.more.href} data-reveal="fade">{insights.more.label} <Arrow /></Ext>
        </div>
        <div className="cards-4">
          {insights.items.map((a) => (
            <Ext className="insight" key={a.href} href={a.href} data-reveal="card">
              <div className="media" data-reveal="image">
                <Image src={a.image.src} alt={a.image.alt} width={a.image.w} height={a.image.h} sizes="(max-width: 520px) 100vw, (max-width: 1020px) 50vw, 25vw" />
              </div>
              <div className="meta"><time dateTime={a.date}>{fmt.format(new Date(a.date))}</time><span aria-hidden="true">·</span><span>{a.read}</span></div>
              <h3 className="h3">{a.title}</h3>
              <p>{a.text}</p>
            </Ext>
          ))}
        </div>
      </div>
    </section>
  );
}
