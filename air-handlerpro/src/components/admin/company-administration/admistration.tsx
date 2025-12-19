import { useState } from "react";
import TabNavigation from "@/components/app/UI-components/systemHorizanltBar";
import Overview from "./content/overviewContent";
import Users from "./content/usersContent";
import Tasks from "./content/taskContent";
import Companies from "./content/companiesContent";
import ErrorLogs from "./content/errorlogsContent";
import Materials from "./content/materialscontent";
import Database from "./content/databaseContent";
import Sheets from "./content/sheetsContent";

export default function Administration() {
      
const tabs = [
  { name: "System Overview", value: "overview" },
  { name: "Companies", value: "companies" },
  { name: "Users", value: "users" },
  { name: "Task Library", value: "tasks" },
  { name: "Materials", value: "materials" },
  { name: "Errors logs", value: "errors" },
  { name: "Upload Database", value: "database" },
  { name: "Task Sheet Upload", value: "sheets" },
];

    const [activeTab, setActiveTab] = useState("overview");
     const renderTabContent = () => {
        switch (activeTab) {
          case "overview":
            return <Overview />;
          case "companies":
            return <Companies />;
          case "users":
            return <Users/>;
          case "tasks":
            return <Tasks/>;
          case "materials":
            return <Materials/>;
          case "errors":
            return <ErrorLogs />;
          case "database":
            return <Database />;
          case "sheets":
            return <Sheets />;

          default:
            return <Overview />;
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
