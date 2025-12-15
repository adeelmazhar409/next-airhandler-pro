import { RightArrowIcon } from "@/components/icons/icons";
import Link from "next/link";

const Section1 = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden mx-10 rounded-b-big-block">
        <img
          src="/hero-commercial-hvac.jpg"
          alt="Commercial HVAC"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50"></div>
        <div className="relative text-white">
          <div className="container mx-auto max-w-7xl px-4 py-10 md:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold">
                HVAC software & business consulting to grow your company
              </h1>
              <p className="mt-6 text-lg md:text-xl leading-8">
                Get the tools to estimate faster and more profitably with
                AirHandler Pro. Need strategic guidance? Our consulting services
                help you scale operations, increase profitability, and build a
                stronger business.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/auth"
                  className="inline-flex items-center justify-center rounded-pill bg-cerulean/90 hover:bg-cerulean text-white px-8 gap-2 py-3 text-sm font-medium transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  Try HVAC Software
                  <RightArrowIcon />
                </Link>
                <Link
                  href="#consulting"
                  className="inline-flex items-center justify-center rounded-pill bg-white/80 hover:bg-white text-charcoal px-8 py-3 text-sm font-medium transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  Business Consulting
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full gap-1 bg-platinum text-charcoal px-3 py-1 text-xs font-semibold">
                  <img src="/calculator.png" alt="" className="h-4" />
                  HVAC Software
                </span>
                <span className="inline-flex items-center rounded-full bg-platinum gap-1 text-charcoal px-3 py-1 text-xs font-semibold">
                  <img src="/briefcase.png" alt="" className="h-4" />
                  Business Consulting
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-platinum text-charcoal px-3 py-1 text-xs font-semibold">
                  <img src="/grow.png" alt="" className="h-4" />
                  Grow Together
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;
