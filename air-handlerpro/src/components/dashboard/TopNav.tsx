import React from "react";

const TopNav = () => (
  <header className="sticky top-0 z-40 bg-white border-b-4 border-cerulean shadow-sm">
    <div className="container mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
      <a
        href="/"
        className="flex items-center gap-3 transition-transform hover:scale-105"
      >
        <img
          src="/airhandler-pro-logo.png"
          alt="AirHandler Pro logo"
          className="h-14 md:h-16 w-auto"
        />
      </a>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <a href="#services" className="text-charcoal hover:text-cerulean transition-colors">
          Our Services
        </a>
        <a href="#hvac-software" className="text-charcoal hover:text-cerulean transition-colors">
          HVAC Software
        </a>
        <a href="#consulting" className="text-charcoal hover:text-cerulean transition-colors">
          Consulting
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <a
          href=""
          className="border border-silver bg-white hover:bg-platinum px-3 py-2 text-sm font-medium text-charcoal transition-colors"
        >
          Consulting Login
        </a>
        <a
          href="/auth"
          className="border border-silver bg-white hover:bg-platinum px-3 py-2 text-sm font-medium text-charcoal transition-colors"
        >
          Job Login
        </a>
        <a
          href="/auth"
          className="bg-cerulean text-white hover:bg-slate px-4 py-2 text-sm font-medium transition-colors"
        >
          Get Started
        </a>
      </div>
    </div>
  </header>
);

export default TopNav;