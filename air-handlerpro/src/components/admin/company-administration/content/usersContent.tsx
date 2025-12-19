import Button from "@/components/app/UI-components/button";
import DataTable, { Column,Company } from "../UI-components/table";
import {  Building, FileText, Edit } from "lucide-react";
export default function Users() {

   const users: Company[] = [
    {
      id: 1,
      name: "Side Hustle Network",
      email: "shnetwork.cmo",
      role: "software admin",
      company: "Side Hustle Network",
      estimates: 0,
      joined: "Active",
    },
     {
      id: 2,
      name: "Side Hustle Network",
      email: "shnetwork.cmo",
      role: "software admin",
      company: "Side Hustle Network",
      estimates: 0,
      joined: "Active",
    },
     {
      id: 3,
      name: "Side Hustle Network",
      email: "shnetwork.cmo",
      role: "software admin",
      company: "Side Hustle Network",
      estimates: 0,
      joined: "Active",
    },
  ];



  const columns: Column<Company>[] = [
    {
      key: "name",
      header: "Company",
      span: 3,
      render: (users) => (
        <p className="text-sm font-medium text-charcoal">{users.name}</p>
      ),
    },
    {
      key: "domain",
      header: "Domain",
      span: 2,
      render: (users) => (
        <p className="text-sm text-slate">{users.email}</p>
      ),
    },
    {
      key: "users",
      header: "Users",
      span: 1,
      render: (users) => (
        <div className="flex items-center gap-1">
          <Building className="w-4 h-4 text-slate" />
          <span className="text-sm text-charcoal">{users.role}</span>
        </div>
      ),
    },
    {
      key: "customers",
      header: "Customers",
      span: 1,
      render: (users) => (
        <div className="flex items-center gap-1">
          <Building className="w-4 h-4 text-slate" />
          <span className="text-sm text-charcoal">{users.company}</span>
        </div>
      ),
    },
    {
      key: "estimates",
      header: "Estimates",
      span: 1,
      render: (users) => (
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4 text-slate" />
          <span className="text-sm text-charcoal">{users.joined}</span>
        </div>
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
          <Building />
          Company Management
        </h1>
        <Button value="Add Company" />
      </div>

      <DataTable
        columns={columns}
        data={users}
        onRowClick={handleRowClick}
        emptyMessage="No companies found"
      />
    </div>
  );
}
