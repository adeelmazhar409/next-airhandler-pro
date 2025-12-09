const Footer = () => (
  <footer className="border-t">
    <div className="container mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        AirHandler Pro — HVAC estimating software
      </div>
      <nav className="flex items-center gap-4 text-sm text-neutral-500">
        <a href="#services" className="hover:text-neutral-900">
          Services
        </a>
        <a href="#hvac-software" className="hover:text-neutral-900">
          HVAC Software
        </a>
        <a href="#consulting" className="hover:text-neutral-900">
          Consulting
        </a>
        <a href="/auth" className="hover:text-neutral-900">
          Sign In
        </a>
      </nav>
    </div>
  </footer>
);
export default Footer;
