import React from "react";
import StatsCardsRow from "@/components/app/UI-components/StatCardRow";
import {
  UserApprovalIcon,
  CompanyIcon,
  SettingsIcon,
} from "@/components/icons/icons";
import {
  CardContainer,
  CardHeader,
  SearchBar,
  QuickActionButton,
  StatusBadge,
  UserAvatar,
} from "./adminuserUI";
import { User, Company, Stat, Activity } from "./types";

// Overview Tab
export const OverviewTab = ({
  stats,
  pendingUsers,
  companies,
  activities,
  onTabChange,
}: {
  stats: Stat[];
  pendingUsers: User[];
  companies: Company[];
  activities: Activity[];
  onTabChange: (tab: string) => void;
}) => (
  <>
    {/* Stats Cards */}
    <StatsCardsRow stats={stats} />

    {/* Quick Actions */}
    <CardContainer>
      <h2 className="text-lg font-bold text-charcoal mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        <QuickActionButton
          icon={<UserApprovalIcon />}
          title="Review Approvals"
          subtitle={`${pendingUsers.length} pending`}
          onClick={() => onTabChange("approvals")}
        />
        <QuickActionButton
          icon={<CompanyIcon />}
          title="Manage Companies"
          subtitle={`${companies.length} active`}
          onClick={() => onTabChange("companies")}
        />
        <QuickActionButton
          icon={<SettingsIcon />}
          title="System Settings"
          subtitle="Configure platform"
          onClick={() => onTabChange("settings")}
        />
      </div>
    </CardContainer>

    {/* Recent Activity */}
    <CardContainer>
      <h2 className="text-lg font-bold text-charcoal mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-silver last:border-0"
          >
            <div>
              <div className="text-sm font-medium text-charcoal">
                {activity.action}
              </div>
              <div className="text-xs text-slate">{activity.detail}</div>
            </div>
            <div className="text-xs text-slate">{activity.time}</div>
          </div>
        ))}
      </div>
    </CardContainer>
  </>
);

// User Approvals Tab
export const UserApprovalsTab = ({
  pendingUsers,
  searchValue,
  onSearchChange,
  onApprove,
  onReject,
}: {
  pendingUsers: User[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}) => (
  <CardContainer noPadding>
    <CardHeader
      title="Pending User Approvals"
      action={
        <div className="text-sm text-slate">{pendingUsers.length} requests</div>
      }
    />

    <SearchBar
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search by name, email, or company..."
    />

    {/* User List */}
    <div className="divide-y divide-silver">
      {pendingUsers.map((user) => (
        <div
          key={user.id}
          className="px-6 py-4 hover:bg-platinum/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <UserAvatar name={user.name} />
                <div>
                  <div className="font-semibold text-charcoal">{user.name}</div>
                  <div className="text-sm text-slate">{user.email}</div>
                </div>
              </div>
              <div className="ml-13 space-y-1">
                <div className="text-sm text-slate">
                  <span className="font-medium">Company:</span> {user.company}
                </div>
                <div className="text-sm text-slate">
                  <span className="font-medium">Requested:</span>{" "}
                  {new Date(user.requestedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onReject(user.id)}
                className="px-4 py-2 border-2 border-silver rounded-lg text-sm font-medium text-charcoal hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove(user.id)}
                className="px-4 py-2 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardContainer>
);

// Companies Tab
export const CompaniesTab = ({
  companies,
  searchValue,
  onSearchChange,
  onSuspend,
}: {
  companies: Company[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSuspend: (companyId: string) => void;
}) => (
  <CardContainer noPadding>
    <CardHeader
      title="Company Management"
      action={
        <button className="px-4 py-2 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors">
          Add New Company
        </button>
      }
    />

    <SearchBar
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search companies..."
    />

    {/* Company List */}
    <div className="divide-y divide-silver">
      {companies.map((company) => (
        <div
          key={company.id}
          className="px-6 py-4 hover:bg-platinum/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-cerulean/10 flex items-center justify-center">
                  <CompanyIcon />
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-lg">
                    {company.name}
                  </div>
                  <div className="text-sm text-slate">
                    Admin: {company.adminName}
                  </div>
                </div>
              </div>
              <div className="ml-15 grid grid-cols-3 gap-4">
                <div className="text-sm">
                  <span className="text-slate">Users:</span>{" "}
                  <span className="font-medium text-charcoal">
                    {company.users}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-slate">Created:</span>{" "}
                  <span className="font-medium text-charcoal">
                    {new Date(company.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-slate">Status:</span>{" "}
                  <StatusBadge status={company.status} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-silver rounded-lg text-sm font-medium text-charcoal hover:border-cerulean hover:bg-cerulean/5 transition-colors">
                View Details
              </button>
              <button
                onClick={() => onSuspend(company.id)}
                className="px-4 py-2 border-2 border-silver rounded-lg text-sm font-medium text-charcoal hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                {company.status === "active" ? "Suspend" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardContainer>
);

// Settings Tab
export const SettingsTab = () => (
  <CardContainer>
    <h2 className="text-lg font-bold text-charcoal mb-4">System Settings</h2>
    <div className="space-y-6">
      {/* Registration Settings */}
      <div className="border-2 border-silver rounded-xl p-4">
        <h3 className="font-semibold text-charcoal mb-3">
          Registration Settings
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
              defaultChecked
            />
            <span className="text-sm text-charcoal">
              Require admin approval for new users
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
            />
            <span className="text-sm text-charcoal">
              Auto-approve users from verified companies
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-cerulean border-silver rounded focus:ring-cerulean"
              defaultChecked
            />
            <span className="text-sm text-charcoal">
              Send email notifications for new registrations
            </span>
          </label>
        </div>
      </div>

      {/* Company Settings */}
      <div className="border-2 border-silver rounded-xl p-4">
        <h3 className="font-semibold text-charcoal mb-3">Company Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Maximum Users Per Company
            </label>
            <input
              type="number"
              defaultValue="50"
              className="w-full px-3 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Trial Period (days)
            </label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full px-4 py-3 bg-cerulean border-2 border-cerulean rounded-lg text-sm font-medium text-white hover:bg-cerulean/90 transition-colors">
        Save Settings
      </button>
    </div>
  </CardContainer>
);
