import Image from "next/image";
import { Arrow, Ext } from "@/components/ui";
import { closing } from "@/lib/content";

/* kina.co's closing panel: one centred statement over photography, then the ticker and footer. */
export default function Closing() {
  return (
    <section className="panel closing on-dark" data-tone="light" data-late="" aria-labelledby="closing-title">
      <div className="bg"><Image src={closing.image.src} alt="" width={closing.image.w} height={closing.image.h} sizes="100vw" /></div>
      <div className="inner">
        <h2 className="h2" id="closing-title" data-reveal="heading">{closing.title}</h2>
        <p className="body" data-reveal="fade">{closing.body}</p>
        <div data-reveal="fade"><Ext className="btn btn-white" href={closing.cta.href}>{closing.cta.label} <Arrow /></Ext></div>
      </div>
    </section>
  );
}
