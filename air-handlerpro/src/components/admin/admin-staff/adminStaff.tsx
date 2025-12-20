import TabNavigation from "@/components/app/UI-components/TopNavigation";
import React, { useState } from "react";
import UserandCompanyManagement from "./content/UserandCompanyManegment";
import Settings from "./content/settings";

export default function AdminStaff() {
   
   const tabs = [
     { name: "User and Company Management", value: "userandcompanymanagement" },
     { name: "Settings", value: "settings" },
   
    
   
    
   ];
   
       const [activeTab, setActiveTab] = useState("userandcompanymanagement");
        const renderTabContent = () => {
           switch (activeTab) {
             case "userandcompanymanagement":
               return <UserandCompanyManagement />;
             case "settings":
               return <Settings />;         
             default:
               return <UserandCompanyManagement/>;
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