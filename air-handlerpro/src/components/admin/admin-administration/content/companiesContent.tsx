// pages/Companies.tsx
import Button from "@/components/app/UI-components/button";
import DataTable, { Column } from "../UI-components/table";
import { Building2, Users, Building, FileText, Edit } from "lucide-react";
import { useState } from "react";
import { CustomerCompanyForm } from "../forms/CustomerCompanyForm";

interface Company {
  id: number;
  name: string;
  domain: string;
  users: number;
  customers: number;
  estimates: number;
  status: string;
  created: string;
}

export default function Companies() {
  const [formToggle, setFormToggle] = useState(false);

  const handleCreateCompany = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
    // After successful submission, you might want to close the form:
    // setFormToggle(false);
  };

  if (formToggle) {
    return (
      <CustomerCompanyForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }

  const companies: Company[] = [
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

  const columns: Column<Company>[] = [
    {
      key: "name",
      header: "Company",
      span: 3, // Larger span for company name
      render: (company) => (
        <p className="text-sm font-medium text-charcoal">{company.name}</p>
      ),
    },
    {
      key: "domain",
      header: "Domain",
      span: 2,
      render: (company) => (
        <p className="text-sm text-slate">{company.domain}</p>
      ),
    },
    {
      key: "users",
      header: "Users",
      span: 1,
      render: (company) => (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-slate" />
          <span className="text-sm text-charcoal">{company.users}</span>
        </div>
      ),
    },
    {
      key: "customers",
      header: "Customers",
      span: 1,
      render: (company) => (
        <div className="flex items-center gap-1">
          <Building className="w-4 h-4 text-slate" />
          <span className="text-sm text-charcoal">{company.customers}</span>
        </div>
      ),
    },
    {
      key: "estimates",
      header: "Estimates",
      span: 1,
      render: (company) => (
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4 text-slate" />
          <span className="text-sm text-charcoal">{company.estimates}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      span: 1,
      render: (company) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {company.status}
        </span>
      ),
    },
    {
      key: "created",
      header: "Created",
      span: 2,
      render: (company) => (
        <span className="text-sm text-slate">{company.created}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      span: 1,
      align: "right",
      render: () => (
        <button className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
          <Edit className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const handleRowClick = (company: Company) => {
    console.log("Clicked company:", company);
  };

  return (
    <div className="p-8 border border-slate/30 rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
          <Building2 />
          Company Management
        </h1>
        <Button onClick={handleCreateCompany} value="Create New Company" />
      </div>

      <DataTable
        columns={columns}
        data={companies}
        onRowClick={handleRowClick}
        emptyMessage="No companies found"
      />
    </div>
  );
}