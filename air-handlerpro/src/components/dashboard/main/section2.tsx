import { title } from "process";
import Mainbox from "./mainbox";
import {
  ActitivtyIcon,
  BagIcon,
  BuildingIcon,
  CalculatorIcon,
  CircleIcon,
  ClipboardIcon,
  ContactsIcon,
  EfficiencyIcon,
  FileIcon,
  GrowthIcon,
  LightIcon,
  MobileIcon,
  purposalBuild,
  RightArrowIcon,
  RocketIcon,
  TeamIcon,
} from "@/components/icons/icons";
import Link from "next/link";

const Section2 = () => {
  const softwarecard = {
    title: "AirHandler Pro Software",
    titleIcon: <CalculatorIcon className="h-6 w-6" />,
    titleSize: "text-2xl",
    description:
      "HVAC estimating software built for commercial contractors. Create maintenance agreements, proposals, and estimates fast to boost profitability and close more deals.",
    list: [
      { icon: <RocketIcon className="h-4 w-4 text-cerulean"/>, value: "Commercial HVAC focus" },
      { icon: <ClipboardIcon className="h-4 w-4 "/>, value: "Estimate templates" },
      { icon: <FileIcon/>, value: "Maintenance agreements" },
      { icon: <GrowthIcon />, value: "Proposal builder" },
    ],
    button: true,
    buttonText: "Learn More",
    buttonHref: "/auth",
    buttonColor: "bg-cerulean text-white w-full",
  };

  const consultingcard = {
    title: "Business Consulting",
    titleIcon: <BagIcon className="h-6 w-6" />,
    titleSize: "text-2xl",
    description:
      "Strategic consulting services to help you scale operations, increase profitability, and build a stronger HVAC business. Expert guidance tailored to your growth goals.",
    list: [
      {
        icon: <CircleIcon className="h-4 w-4 text-cerulean" />,
        value: "Strategic business planning",
      },
      {
        icon: <EfficiencyIcon className="h-4 w-4 text-cerulean" />,
        value: "Operational efficiency analysis",
      },
      { icon: <LightIcon />, value: "Growth strategy development" },
      { icon: <GrowthIcon className="h-4 w-4 text-cerulean" />, value: "Profitability optimization" },
    ],
    button: true,
    buttonText: "Learn More",
    buttonHref: "#consulting",
    buttonColor: "bg-platinum text-charcoal w-full",
  };

  const estimating = {
    title: "Estimating at its core",
    titleIcon: <CalculatorIcon className="h-6 w-6 text-cerulean" />,
    description:
      "Libraries, templates, and automation reduce manual entry and speed up every estimate. Create maintenance agreements, small quotes, and large project proposals with the same intuitive flow.",
    descriptionSize: "text-sm",
    list: [],
    button: false,
  };

  const Purposal = {
    title: "Estimating at its core",
    titleIcon: <FileIcon className="h-4 w-4 text-cerulean" />,
    description: "Branded PDFs and e‑sign ready.",
    descriptionSize: "text-sm text-center",
    list: [],
    button: false,
  };

  const Team = {
    title: "Team-ready",
    titleIcon: <TeamIcon className="h-4 w-4 text-cerulean" />,
    description: "Works for field, office, and sales roles.",
    descriptionSize: "text-sm text-center",
    list: [],
    button: false,
  };

  const planning = {
    title: "Strategic Planning",
    titleIcon: <CircleIcon className="h-6 w-6 text-cerulean" />,
    description:
      "Develop clear growth strategies, set achievable goals, and create actionable roadmaps for your business expansion.",
    descriptionSize: "text-sm",
    list: [],
    button: false,
  };

  const operation = {
    title: "Operations Optimization",
    titleIcon: <EfficiencyIcon className="h-6 w-6 text-cerulean" />,
    description:
      "Streamline workflows, improve team efficiency, and implement systems that scale with your business growth.",
    descriptionSize: "text-sm",
    list: [],
    button: false,
  };

  const profit = {
    title: "Profitability Analysis",
    titleIcon: <GrowthIcon className="h-6 w-6 text-cerulean" />,
    description:
      "Identify margin leaks, optimize pricing strategies, and maximize profitability across all service lines.",
    descriptionSize: "text-sm",
    list: [],
    button: false,
  };

  const upgrade = {
    title: "Upgrade to AirHandler Pro",
    titleSize:"text-2xl",
    description:
      "Consulting clients can add AirHandler Pro software at a special rate to complement strategic guidance with powerful operational tools.",
    descriptionSize: "text-sm",
    list: [],
    button: true,
    buttonText: "View Both Services",
    buttonHref: "#services",
    buttonColor: "bg-cerulean text-white  ",
    center:"items-center"
  };

  const mobile = {
    title: "Built for mobile",
    titleIcon: <MobileIcon className="h-6 w-6 text-cerulean" />,
    description:
      "Create and send estimates in the field. AirHandler Pro is responsive and fast on phones and tablets.",
    descriptionSize: "text-sm",
    list: [],
    button: false,
  };

  const field = {
    title: "Field",
    titleIcon: <MobileIcon className="h-6 w-6 text-cerulean" />,
    description:
      "Quick-create options, photos, and notes so techs can generate accurate quotes on site.",
    descriptionSize: "text-sm",
  };

   const sales = {
     title: "Sales",
     titleIcon: <TeamIcon className="h-6 w-6 text-cerulean" />,
     description:
       "Pipeline tools and proposal follow‑ups to move deals to “won” faster.",
     descriptionSize: "text-sm",
   };
  
   const office = {
     title: "Office",
     titleIcon: <CalculatorIcon className="h-6 w-6 text-cerulean" />,
     description:
       "Detailed costing, approvals, and templates for consistent, profitable estimates.",
     descriptionSize: "text-sm",
   };
  
   const ready = {
     title: "Ready to grow your HVAC business?",
     titleSize: "text-2xl md:text-3xl text-center",
     description:
       "Whether you need powerful estimating software, strategic business consulting, or both — we're here to help you scale profitably.",
     descriptionSize: "text-sm",
     list: [],
     button: true,
     buttonText: "Try HVAC Software",
     buttonHref: "/auth",
     buttonColor: "bg-cerulean text-white ",
     buttontwo: true,
     buttontwoText: "Explore Consulting",
     buttontwoHref: "#consulting",
     buttontwoColor: "bg-platinum text-charcoal w-fit ",
     center: "items-center",
   };

  return (
    <>
      {/* Two Services */}
      <section
        id="services"
        className="container mx-auto max-w-7xl px-4 py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">
            Two ways to grow your HVAC business
          </h2>
          <p className="mt-4 text-slate max-w-2xl mx-auto">
            Choose the tools to streamline operations, strategic consulting to
            scale profitably, or both.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Software Card */}
          <Mainbox {...softwarecard} />
          {/* Consulting Card */}
          <Mainbox {...consultingcard} />
        </div>
      </section>

      {/* HVAC Software Details */}
      <section id="hvac-software" className="bg-cerulean ">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                More than a CRM. Your HVAC sales engine.
              </h2>
              <p className="mt-4 text-white">
                AirHandler Pro optimizes your sales pipeline end-to-end — from
                lead capture to proposal approval. Automate handoffs,
                standardize pricing, and keep every opportunity moving.
              </p>
              <div className="mt-6 grid gap-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-white  mt-0.5"
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
                    <div className="font-medium text-white">
                      Pipeline visibility
                    </div>
                    <div className="text-sm text-white">
                      Track every opportunity and stage with clarity.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-white  mt-0.5"
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
                    <div className="font-medium text-white">
                      Standardized proposals
                    </div>
                    <div className="text-sm text-white">
                      Professional, consistent proposals your clients trust.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-white mt-0.5"
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
                    <div className="font-medium text-white">
                      Margin protection
                    </div>
                    <div className="text-sm text-white">
                      Smart guardrails ensure profitable pricing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Mainbox {...estimating} />

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Mainbox {...Purposal} />
                <Mainbox {...Team} />
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
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">
            Business consulting for HVAC contractors
          </h2>
          <p className="mt-4 text-slate max-w-2xl mx-auto">
            Strategic guidance to help you scale operations, improve
            profitability, and build a thriving business.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Mainbox {...planning} />
          <Mainbox {...operation} />
          <Mainbox {...profit} />
        </div>
        <div className="mt-12 text-center">
          <Mainbox {...upgrade} />
        </div>
      </section>

      {/* Maintenance Agreements */}
      <section id="agreements" className="bg-cerulean">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                Maintenance agreement estimating and proposals
              </h2>
              <p className="mt-4 text-white">
                Build multi-site agreements with task libraries, scheduled
                visits, and transparent pricing. Generate polished proposals
                your clients can approve on the spot.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-white">
                <li className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-white mt-0.5"
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
                    className="h-4 w-4 text-white mt-0.5"
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
                    className="h-4 w-4 text-white mt-0.5"
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
            <Mainbox {...mobile} />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools"
        className="container mx-auto max-w-7xl px-4 py-16 md:py-24"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-charcoal">
          Tools for every estimate
        </h2>
        <p className="mt-3 text-center text-slate max-w-2xl mx-auto">
          Small quotes or large projects — whether you're in the field, the
          office, or on the go.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Mainbox  {...field} />
          <Mainbox {...sales} />
          <Mainbox {...office} />
          
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-cerulean/70">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <Mainbox {...ready} />
    
        </div>
      </section>
    </>
  );
};

export default Section2;
