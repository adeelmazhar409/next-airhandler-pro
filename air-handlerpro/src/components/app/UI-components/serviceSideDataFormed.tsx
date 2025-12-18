// app/page.tsx or any component

import ServiceSiteCard from "@/components/app/UI-components/serviceSideCardData";
// data/serviceSites.ts (or directly in your page)

export const serviceSitesData = [
  {
    siteName: "Air handler Pro Location #2",
    siteType: "hq",
    siteTypeLabel: "AirHandler Pro HQ",
    address: "184625 Long Street Orlando, FL 32901",
    contactName: "Meghan Germany",
    contactPhone: "472-028-0092",
    contactEmail: "meghan@thisisfake.com",
    ownerEmail: "timwallick@gmail.com",
  },
  {
    siteName: "Stan Lee's Service Site",
    siteType: "standalone",
    siteTypeLabel: "Standalone",
    address: "15488 Orange Dr Apopka, FL 32756",
    contactName: "Stan Lee",
    contactPhone: "407-555-1249",
    contactEmail: "stan.lee@stanlees.com",
    ownerEmail: "timwallick@gmail.com",
  },
  {
    siteName: "Test SH Network Site w/ parent",
    siteType: "global",
    siteTypeLabel: "SH Network Global",
    address: "65654 Street Lane orlando, FL 35654",
    contactName: "Mason Keith",
    contactPhone: "407-458-5548",
    contactEmail: "mason@gmail.com",
    ownerEmail: "timwallick@gmail.com",
  },
  {
    siteName: "Test SH Network Site w/ parent",
    siteType: "global",
    siteTypeLabel: "SH Network Global",
    address: "65654 Street Lane orlando, FL 35654",
    contactName: "Mason Keith",
    contactPhone: "407-458-5548",
    contactEmail: "mason@gmail.com",
    ownerEmail: "timwallick@gmail.com",
  },    
];

export default function ServiceSitesGrid() {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Service Sites</h2>

      <div className="flex gap-3 flex-wrap">
        {serviceSitesData.map((site, index) => (
          <ServiceSiteCard key={index} {...site} />
        ))}
      </div>
    </div>
  );
}
