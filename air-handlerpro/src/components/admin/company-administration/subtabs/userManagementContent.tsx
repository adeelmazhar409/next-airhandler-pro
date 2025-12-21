"use client";

import Button from "@/components/app/UI-components/button";
import DataTable, {
  ActionOption,
  Column,
} from "../../admin-administration/UI-components/table";
import { Users as UsersIcon, Edit, KeyRound } from "lucide-react";
import { useState } from "react";
import { UserForm } from "../forms/UserForm";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string;
  joined: string;
}

export default function UserManegement() {
  const [formToggle, setFormToggle] = useState(false);

  const users: User[] = [
    {
      id: 1,
      name: "kagok71099@roratu.com",
      email: "kagok71099@roratu.com",
      role: "software admin",
      company: "",
      joined: "10/2/2025",
    },
    {
      id: 2,
      name: "adeelmazhar409@gmail.com",
      email: "adeelmazhar409@gmail.com",
      role: "user",
      company: "Testing User Company",
      joined: "13/12/2025",
    },
    {
      id: 3,
      name: "test@123.com",
      email: "test@123.com",
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

  // Reset password handler
  const handleResetPassword = (user: User) => {
    console.log("Reset password for:", user);
    // TODO: Show confirmation modal and send reset password email
    const confirmed = confirm(`Send password reset email to ${user.email}?`);
    if (confirmed) {
      // API call to send reset password email
      alert(`Password reset email sent to ${user.email}`);
    }
  };

  // Define actions - only Reset Password
  const actions: ActionOption<User>[] = [
    {
      label: "Reset Password",
      icon: <KeyRound className="w-4 h-4" />,
      onClick: handleResetPassword,
    },
  ];

  const userColumns: Column<User>[] = [
    {
      key: "name",
      header: "Name",
      span: 2,
      render: (user) => (
        <p className="text-sm font-medium text-charcoal">{user.name}</p>
      ),
    },
    {
      key: "email",
      header: "Email",
      span: 2,
      render: (user) => <p className="text-sm text-slate">{user.email}</p>,
    },
    {
      key: "role",
      header: "Role",
      span: 1,
      render: (user) => getRoleBadge(user.role),
    },
    {
      key: "company",
      header: "Company",
      span: 2,
      render: (user) => (
        <span className="text-sm text-charcoal">{user.company || "-"}</span>
      ),
    },
    {
      key: "joined",
      header: "Joined",
      span: 1,
      render: (user) => (
        <span className="text-sm text-charcoal">{user.joined}</span>
      ),
    },
  ];

  const handleRowClick = (user: User) => {
    console.log("Clicked user:", user);
  };

  const handleCreateUser = () => {
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
    return <UserForm onCancel={handleCancel} onSubmit={handleSubmit} />;
  }

  return (
    <div className="p-8 border border-slate/30 rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
          <UsersIcon />
          User Management
        </h1>
        <Button onClick={handleCreateUser} value="Add User" />
      </div>

      <DataTable
        columns={userColumns}
        data={users}
        onRowClick={handleRowClick}
        emptyMessage="No users found"
        actions={actions} // Add only Reset Password action
      />
    </div>
  );
}
