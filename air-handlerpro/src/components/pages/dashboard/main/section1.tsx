const section1 = () => (
  <section className="relative overflow-hidden">
    <img
      src="/hero-commercial-hvac.jpg"
      alt="Commercial HVAC"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/75"></div>
    <div className="relative text-white">
      <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold ">
            HVAC software & business consulting to grow your company
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8">
            Get the tools to estimate faster and more profitably with AirHandler
            Pro. Need strategic guidance? Our consulting services help you scale
            operations, increase profitability, and build a stronger business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="/auth"
              className="inline-flex items-center justify-center bg-black  hover:bg-neutral-100  px-8 gap-2 py-3 text-sm font-medium"
            >
              Try HVAC Software
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </a>
            <a
              href="#consulting"
              className="inline-flex items-center justify-center bg-neutral-200 text-neutral-900 hover:bg-neutral-300  px-8 py-3 text-sm font-medium"
            >
              Business Consulting
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full  gap-1 bg-neutral-200 text-neutral-900 px-3 py-1 text-xs font-semibold">
              <img src="/calculator.png" alt="" className="h-4" />
              HVAC Software
            </span>
            <span className="inline-flex q-center rounded-full bg-neutral-200 gap-1 text-neutral-900 px-3 py-1 text-xs font-semibold">
              <img src="/briefcase.png" alt="" className="h-4" />
              Business Consulting
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-200 text-neutral-900 px-3 py-1  text-xs font-semibold">
              <img src="/grow.png" alt="" className="h-4" />
              Grow Together
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default section1;
