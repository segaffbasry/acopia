import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Challenges from "@/components/home/Challenges";
import Closing from "@/components/home/Closing";
import Deliver from "@/components/home/Deliver";
import Hero from "@/components/home/Hero";
import Insights from "@/components/home/Insights";
import MoreWithLess from "@/components/home/MoreWithLess";
import Problem from "@/components/home/Problem";
import Trusted from "@/components/home/Trusted";
import Motion from "@/components/Motion";
import Preloader from "@/components/Preloader";
import Ticker from "@/components/Ticker";

/* The single route. Section order follows the live homepage, restaged (see README). */
export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Challenges />
        <Problem />
        <MoreWithLess />
        <Deliver />
        <Trusted />
        <Insights />
        <Closing />
      </main>
      <Ticker />
      <Footer />
      <Motion />
    </>
  );
}
