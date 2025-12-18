// app/page.tsx or any component

import CustomerAccountCard from "./companySideData";
// data/customerAccounts.ts

export const customerAccountsData = [
  {
    accountName: "AirHandler Pro HQ",
    badgeLabel: "Parent • Customer",
    sitesCount: 1,
    billingContactName: "Shane Gillis",
    billingAddress: "1234 Apple Street Orlando, FL 32905",
    billingPhone: "407-885-5555",
    billingEmail: "shane.gillis@gmail.com",
    ownerEmail: "timwallick@gmail.com",
  },
  {
    accountName: "SH Network Global",
    badgeLabel: "Parent • Customer",
    sitesCount: 1,
    billingContactName: "Meghan Garmany",
    billingAddress: "54321 Sample Parent Dr Orlando, FL 32901",
    billingPhone: "321-255-5555",
    billingEmail: "meghan.garmany@jmail.com",
    ownerEmail: "timwallick@gmail.com",
  },
  // Add more accounts easily here...
];

export default function CustomerAccountsGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Customer Accounts
      </h2>

      <div className="flex gap-3  flex-wrap">
        {customerAccountsData.map((account, index) => (
          <CustomerAccountCard
                key={index} // Use unique ID in production
                {...account}
          />
        ))}
      </div>
    </div>
  );
}
