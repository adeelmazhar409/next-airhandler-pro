import { useState } from "react";
import TabNavigation from "../../app/UI-components/systemHorizanltBar";
import CompanyOverview from "./subtabs/companyoverviewContent";
import UserManegement from "./subtabs/userManagementContent";
import LaborRates from "./subtabs/laborRatesContent";
import MaterialContent from "./subtabs/materialsConetent";
import CompanySettings from "./subtabs/CompanySettingContent";
import ErrorLogs from "./subtabs/errorLogsContent";



export default function SystemAdministration() {
  const tabs = [
    { name: "Company Overview", value: "companyoverview" },
    { name: "Users Management", value: "usersmanagement" },
    { name: "Labor Rates", value: "laborrates" },
    { name: "Materials", value: "materials" },
    { name: "Company Settings", value: "settings" },
    { name: "Errors logs", value: "errors" },
  ];

  const [activeTab, setActiveTab] = useState("companyoverview");
  const renderTabContent = () => {
    switch (activeTab) {
      case "companyoverview":
        return <CompanyOverview />;
      case "usersmanagement":
        return <UserManegement />;
      case "laborrates":
        return <LaborRates />;
      case "materials":
        return <MaterialContent />;
      case "settings":
        return <CompanySettings />;
      case "errors":
        return <ErrorLogs />;

      default:
        return <CompanyOverview />;
    }
  };

  return (
    <div className="flex p-8 flex-col">
      <div className="w-fit mx-auto">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      {renderTabContent()}
    </div>
  );
}
