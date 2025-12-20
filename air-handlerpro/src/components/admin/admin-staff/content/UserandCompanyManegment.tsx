// pages/users.tsx
import Button from "@/components/app/UI-components/button";
import DataTable, { Column } from "../../company-administration/UI-components/table";
import { Users as UsersIcon, Edit } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  domain:string;
  role: string;
  company: string;
  joined: string;
}


export default function UserandCompanyManagement() {



      const users: User[] = [
        {
          id: 1,
          name: "kagok71099@roratu.com",
          email: "kagok71099@roratu.com",
          domain:"roratu.com",
          role: "software admin",
          company: "",
          joined: "10/2/2025",
        },
        {
          id: 2,
          name: "adeelmazhar409@gmail.com",
          email: "adeelmazhar409@gmail.com",
          domain:"gmail.com",
          role: "user",
          company: "Testing User Company",
          joined: "13/12/2025",
        },
        {
          id: 3,
          name: "test@123.com",
          email: "test@123.com",
            domain:"123.com",
          role: "user",
          company: "Testing User Company",
          joined: "13/12/2025",
        },
      ];
    
      // Helper function to get role badge color
      const getRoleBadge = (role: string) => {
        const isAdmin = role.toLowerCase().includes("admin");
        return (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              isAdmin
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {role}
          </span>
        );
      };
    
      const userColumns: Column<User>[] = [
        {
          key: "name",
          header: "Name",
          span: 2, // Takes 2 units of space
          render: (user) => (
            <p className="text-sm font-medium text-charcoal">{user.name}</p>
          ),
        },
        {
          key: "email",
          header: "Email",
          span: 2, // Takes 2 units of space
          render: (user) => <p className="text-sm text-slate">{user.email}</p>,
        },
        {
          key: "domain",
          header: "Domain",
          span: 1, // Takes 2 units of space
          render: (user) => <p className="text-sm text-slate">{user.domain}</p>,
        },
        {
          key: "role",
          header: "Role",
          span: 2, // Takes 1 unit of space
          render: (user) => getRoleBadge(user.role),
        },
        {
          key: "company",
          header: "Company",
          span: 2, // Takes 2 units of space
          render: (user) => (
            <span className="text-sm text-charcoal">
              {user.company || "-"}
            </span>
          ),
        },
        {
          key: "joined",
          header: "Joined",
          span: 1, // Takes 1 unit of space
          render: (user) => (
            <span className="text-sm text-charcoal">{user.joined}</span>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          span: 1, // Takes 1 unit of space
          align: "right",
          render: () => (
            <button className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          ),
        },
      ];
    
      const handleRowClick = (user: User) => {
        console.log("Clicked user:", user);
      };
    
    return (
        <div className="p-8 border border-slate/30 rounded-lg">
             <div className="flex items-center justify-between mb-8">
               <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
                 <UsersIcon />
                 User Management
               </h1>
               <Button value="Add User" />
             </div>
       
             <DataTable
               columns={userColumns}
               data={users}
               onRowClick={handleRowClick}
               emptyMessage="No users found"
             />
           </div>
    );
}