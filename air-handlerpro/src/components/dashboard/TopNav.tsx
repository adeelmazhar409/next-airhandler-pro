import React from "react";

const TopNav = () => (
  <header className="sticky top-0 z-40 bg-white  border-b-4 border-black shadow-sm">
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
        <a href="#services" className="text-black hover:text-blue-600">
          Our Services
        </a>
        <a href="#hvac-software" className="text-black hover:text-blue-600">
          HVAC Software
        </a>
        <a href="#consulting" className="text-black hover:text-blue-600">
          Consulting
        </a>
      </nav>
      <div className="flex items-center gap-2">
        <a
          href=""
          className="border border-black bg-white hover:bg-neutral-100  px-3 py-2 text-sm font-medium"
        >
          Consulting Login
        </a>
        <a
          href="/auth"
          className="border border-black bg-white hover:bg-neutral-100  px-3 py-2 text-sm font-medium"
        >
          Job Login
        </a>
        <a
          href="/auth"
          className="bg-neutral-900 text-white hover:bg-neutral-800  px-4 py-2 text-sm font-medium"
        >
          Get Started
        </a>
      </div>
    </div>
  </header>
);

export default TopNav;