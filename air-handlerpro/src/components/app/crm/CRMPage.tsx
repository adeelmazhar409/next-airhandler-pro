import { useState } from "react";
import SearchAndFilters from "../UI-components/SearchAndFilter";
import StatsCardsRow from "../UI-components/StatCardRow";
import TabNavigation from "../UI-components/TopNavigation";
import {
  ActiveCustomersIcon,
  ContactsIcon,
  CRMIcon,
  ServiceSitesIcon,
} from "@/components/icons/icons";
import DashboardContent from "./content/DashboardContent";
import PipelineContent from "./content/PipelineContent";
import ActivitiesContent from "./content/ActivitiesContent";
import ContactsContent from "./content/ContactsContent";
import CompaniesContent from "./content/CompaniesContent";
import { InputField } from "@/components/interface/DataTypes";
import { Deal } from "@/components/app/UI-components/table";
import DealDetailPage from "./content/DealDetailPage";

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showDealDetail, setShowDealDetail] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedType, setSelectedType] = useState("");
  // const [searchValue, setSearchValue] = useState("");

  // Handle showing deal detail
  const handleShowDealDetail = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowDealDetail(true);
  };

  // Handle closing deal detail
  const handleCloseDealDetail = () => {
    setShowDealDetail(false);
    setSelectedDeal(null);
  };

  const tabs = [
    { name: "Dashboard", value: "Dashboard" },
    { name: "Pipeline", value: "pipeline" },
    { name: "Activities", value: "activities" },
    { name: "Contacts", value: "contacts" },
    { name: "Companies", value: "companies" },
  ];

  const topStats = [
    {
      title: "Total Companies",
      value: "2",
      icon: <CRMIcon color="text-gray-400" />,
    },
    {
      title: "Service Sites",
      value: "6",
      icon: <ServiceSitesIcon />,
    },
    {
      title: "Active Customers",
      value: "2",
      icon: <ActiveCustomersIcon />,
    },
    {
      title: "Prospects",
      value: "0",
      icon: <ContactsIcon color="text-gray-400" />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
        case "pipeline":
          return <PipelineContent onDealClick={handleShowDealDetail} />;
          case "activities":
            return <ActivitiesContent />;
            case "contacts":
              return <ContactsContent />;
              case "companies":
        console.log("testing render-----------------")
        return <CompaniesContent />;
      default:
        return <DashboardContent />;
    }
  };

  if (showDealDetail && selectedDeal) {
    return (
      <DealDetailPage deal={selectedDeal} onBack={handleCloseDealDetail} />
    );
  }

  return (
    <div className="flex flex-col p-8">
      <StatsCardsRow stats={topStats} />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
