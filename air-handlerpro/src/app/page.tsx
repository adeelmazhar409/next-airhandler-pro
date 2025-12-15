import React from "react";
import TopNav from "@/components/dashboard/TopNav";
import Footer from "@/components/dashboard/Footer";
import Seaction2 from "@/components/dashboard/main/section2";
import Seaction1 from "@/components/dashboard/main/section1";

export default function Home() {
  return (
    <div className="min-h-screen bg-cerulean text-black ">
      {/* Header */}
      <TopNav />

      <main>
        <Seaction1 />
        <Seaction2 />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
