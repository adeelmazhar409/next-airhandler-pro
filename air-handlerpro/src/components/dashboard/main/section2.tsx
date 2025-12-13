const Section2 = () =>   {
 
  return (
    <>
      {/* Two Services */}
      <section
        id="services"
        className="container mx-auto max-w-7xl px-4 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Two ways to grow your HVAC business
          </h2>
          <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
            Choose the tools to streamline operations, strategic consulting to
            scale profitably, or both.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Software Card */}
          <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)]">
            {" "}
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <img src="/calculator.png" alt="" className="h-6" />
                AirHandler Pro Software
              </h3>
            </div>
            <div className="px-6 pb-6">
              <p className="text-neutral-500 mb-6">
                HVAC estimating software built for commercial contractors.
                Create maintenance agreements, proposals, and estimates fast
                to boost profitability and close more deals.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-sm">
                    Lightning-fast estimating workflows
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span className="text-sm">
                    Maintenance agreement builder
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm">
                    Professional proposal generation
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-sm">
                    Margin protection & pricing guardrails
                  </span>
                </div>
              </div>
              <a
                href="/auth"
                className="w-full inline-flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800  px-4 py-2 text-sm font-medium"
              >
                Get Started Free
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
            </div>
          </div>

          {/* Consulting Card */}
          <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] transition-transform hover:scale-105 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),6px_6px_0_0_rgba(0,0,0,1)]">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Business Consulting
              </h3>
            </div>
            <div className="px-6 pb-6">
              <p className="text-neutral-500 mb-6">
                Strategic consulting services to help you scale operations,
                increase profitability, and build a stronger HVAC business.
                Expert guidance tailored to your growth goals.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span className="text-sm">Strategic business planning</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span className="text-sm">
                    Operational efficiency analysis
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="text-sm">Growth strategy development</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-sm">Profitability optimization</span>
                </div>
              </div>
              <a
                href="https://consulting.airhandlerpro.com/customer-auth?mode=login"
                className="w-full inline-flex items-center justify-center bg-neutral-100 text-neutral-900 hover:bg-neutral-300  px-4 py-2 text-sm font-medium"
              >
                Learn More
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
            </div>
          </div>
        </div>
      </section>

      {/* HVAC Software Details */}
      <section id="hvac-software" className="bg-neutral-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">
                More than a CRM. Your HVAC sales engine.
              </h2>
              <p className="mt-4 text-neutral-500">
                AirHandler Pro optimizes your sales pipeline end-to-end — from
                lead capture to proposal approval. Automate handoffs,
                standardize pricing, and keep every opportunity moving.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <div>
                    <div className="font-medium">Pipeline visibility</div>
                    <div className="text-sm text-neutral-500">
                      Track every opportunity and stage with clarity.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <div>
                    <div className="font-medium">Standardized proposals</div>
                    <div className="text-sm text-neutral-500">
                      Professional, consistent proposals your clients trust.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <div className="font-medium">Margin protection</div>
                    <div className="text-sm text-neutral-500">
                      Smart guardrails ensure profitable pricing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <img src="/calculator.png" alt="" className="h-5" />
                    Estimating at its core
                  </h3>
                </div>
                <div className="px-6 pb-6 text-sm text-neutral-500">
                  Libraries, templates, and automation reduce manual entry and
                  speed up every estimate. Create maintenance agreements,
                  small quotes, and large project proposals with the same
                  intuitive flow.
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
                  <div className="p-6 pb-2">
                    <h3 className="text-base font-semibold flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-neutral-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Proposal builder
                    </h3>
                  </div>
                  <div className="px-6 pb-6 text-sm text-neutral-500">
                    Branded PDFs and e-sign ready.
                  </div>
                </div>
                <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
                  <div className="p-6 pb-2">
                    <h3 className="text-base font-semibold flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-neutral-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Team-ready
                    </h3>
                  </div>
                  <div className="px-6 pb-6 text-sm text-neutral-500">
                    Works for field, office, and sales roles.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section
        id="consulting"
        className="container mx-auto max-w-7xl px-4 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Business consulting for HVAC contractors
          </h2>
          <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
            Strategic guidance to help you scale operations, improve
            profitability, and build a thriving business.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Strategic Planning
              </h3>
            </div>
            <div className="px-6 pb-6 text-sm text-neutral-500">
              Develop clear growth strategies, set achievable goals, and
              create actionable roadmaps for your business expansion.
            </div>
          </div>
          <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Operations Optimization
              </h3>
            </div>
            <div className="px-6 pb-6 text-sm text-neutral-500">
              Streamline workflows, improve team efficiency, and implement
              systems that scale with your business growth.
            </div>
          </div>
          <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Profitability Analysis
              </h3>
            </div>
            <div className="px-6 pb-6 text-sm text-neutral-500">
              Identify margin leaks, optimize pricing strategies, and maximize
              profitability across all service lines.
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-block bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] max-w-2xl">
            <div className="p-6">
              <h3 className="text-2xl font-semibold">
                Upgrade to AirHandler Pro
              </h3>
            </div>
            <div className="px-6 pb-6">
              <p className="text-sm text-neutral-500 mb-4">
                Consulting clients can add AirHandler Pro software at a
                special rate to complement strategic guidance with powerful
                operational tools.
              </p>
              <a
                href="#services"
                className="inline-flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800  px-4 py-2 text-sm font-medium"
              >
                View Both Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Agreements */}
      <section id="agreements" className="bg-neutral-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">
                Maintenance agreement estimating and proposals
              </h2>
              <p className="mt-4 text-neutral-500">
                Build multi-site agreements with task libraries, scheduled
                visits, and transparent pricing. Generate polished proposals
                your clients can approve on the spot.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-neutral-500">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  Standardized task libraries
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Accurate labor and material rates
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-neutral-900 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Branded proposals in one click
                </li>
              </ul>
            </div>
            <div>
              <div className="inline-block bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] max-w-2xl">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-neutral-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Built for mobile
                  </h3>
                </div>
                <div className="px-6 pb-6 text-sm text-neutral-500">
                  Create and send estimates in the field. AirHandler Pro is
                  responsive and fast on phones and tablets.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        className="container mx-auto max-w-7xl px-4 py-16 md:py-24"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Tools for every estimate
        </h2>
        <p className="mt-3 text-center text-neutral-500 max-w-2xl mx-auto">
          Small quotes or large projects — whether you're in the field, the
          office, or on the go.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="inline-block bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] max-w-2xl">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Field
              </h3>
            </div>
            <div className="px-6 pb-6 text-sm text-neutral-500">
              Quick-create options, photos, and notes so techs can generate
              accurate quotes on site.
            </div>
          </div>
          <div className="inline-block bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] max-w-2xl">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <img src="/calculator.png" alt="" className="h-5" />
                Office
              </h3>
            </div>
            <div className="px-6 pb-6 text-sm text-neutral-500">
              Detailed costing, approvals, and templates for consistent,
              profitable estimates.
            </div>
          </div>
          <div className="inline-block bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] max-w-2xl">
            <div className="p-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-neutral-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Sales
              </h3>
            </div>
            <div className="px-6 pb-6 text-sm text-neutral-500">
              Pipeline tools and proposal follow-ups to move deals to won
              faster.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-neutral-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className=" bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)] ">
            <div className="p-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-center">
                Ready to grow your HVAC business?
              </h3>
            </div>
            <div className="px-6 pb-6">
              <p className="text-neutral-500 text-center max-w-2xl mx-auto mb-8">
                Whether you need powerful estimating software, strategic
                business consulting, or both — we're here to help you scale
                profitably.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/auth"
                  className="inline-flex items-center gap-2 justify-center bg-neutral-900 text-white hover:bg-neutral-800  px-8 py-3 text-sm font-medium"
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
                  className="inline-flex items-center justify-center bg-neutral-100 text-neutral-900 hover:bg-neutral-300  px-8 py-3 text-sm font-medium"
                >
                  Explore Consulting
                </a>
              </div>
            </div>
          </div>
          </div>
      </section>
    </>

  );
}
  
export default Section2;

