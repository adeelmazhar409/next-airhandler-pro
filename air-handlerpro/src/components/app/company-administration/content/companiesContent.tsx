import Button from "../../UI-components/button";
import { Building2 } from "lucide-react";

export default function Companies() {

  const companies = [
    {
      id: 1,
      name: "Side Hustle Network",
      domain: "shnetwork.cmo",
      users: 0,
      customers: 0,
      estimates: 0,
      status: "Active",
      created: "10/2/2025",
    },
    {
      id: 2,
      name: "Testing User Company",
      domain: "usercompany.com",
      users: 2,
      customers: 0,
      estimates: 0,
      status: "Active",
      created: "7/29/2025",
    },
    {
      id: 3,
      name: "Default Company",
      domain: "default.com",
      users: 2,
      customers: 6,
      estimates: 6,
      status: "Active",
      created: "7/24/2025",
    },
  ];
  return (
    <div className="p-8 border border-slate/30 rounded-lg">
      {/* Header with Title and Add Button */}
      <div className="flex items-center justify-between mb-8 ">
        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
         <Building2/>
          Company Management
        </h1>
        <Button
         
          value="Add Company"
         
        />
      </div>

      {/* Companies Table */}
      <div className="bg-white border border-silver rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-platinum/30 border-b border-silver">
          <div className="grid grid-cols-12 gap-4 px-6 py-3">
            <div className="col-span-3 text-xs font-medium text-slate uppercase tracking-wider">
              Company
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Domain
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider">
              Users
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider">
              Customers
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider">
              Estimates
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider">
              Status
            </div>
            <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
              Created
            </div>
            <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider text-right">
              Actions
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-silver">
          {companies.map((company) => (
            <div
              key={company.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-platinum/20 transition-colors items-center"
            >
              {/* Company Name */}
              <div className="col-span-3">
                <p className="text-sm font-medium text-charcoal">
                  {company.name}
                </p>
              </div>

              {/* Domain */}
              <div className="col-span-2">
                <p className="text-sm text-slate">{company.domain}</p>
              </div>

              {/* Users */}
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-slate"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0A5.002 5.002 0 019 15c0-1.105-.895-2-2-2m0 0a5.002 5.002 0 0110 0m-10 0V9a5 5 0 0110 0v4"
                    />
                  </svg>
                  <span className="text-sm text-charcoal">{company.users}</span>
                </div>
              </div>

              {/* Customers */}
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-slate"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-8 0h6m-6 0H5"
                    />
                  </svg>
                  <span className="text-sm text-charcoal">
                    {company.customers}
                  </span>
                </div>
              </div>

              {/* Estimates */}
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-slate"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm text-charcoal">
                    {company.estimates}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {company.status}
                </span>
              </div>

              {/* Created Date */}
              <div className="col-span-2 text-sm text-slate">
                {company.created}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end">
                <button className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
