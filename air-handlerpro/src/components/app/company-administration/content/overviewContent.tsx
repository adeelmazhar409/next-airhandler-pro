import StatsCardsRow from "../../UI-components/StatCardRow";
import { Building2,PersonStanding,CircleStar,DollarSign,AlertTriangle } from "lucide-react";
import RecentItemsCard from "../UI-components/recentEstimate";
export default function Overview() {
      const OverviewStats = [
        {
          title: "Total Companies",
          value: "3",
          subtitle: "Active Organization",
          icon: <Building2 className="text-slate h-4" />,
        },
        {
          title: "Total users",
          value: "5",
          subtitle: "Registered users",
          icon: <PersonStanding className="text-slate h-4" />,
        },
        {
          title: "Total Customers",
          value: "6",
          subtitle: "Customer records",
          icon: <CircleStar className="text-slate h-4" />,
        },
        {
          title: "Total Estimates",
          value: "6",
          subtitle: "Generated estimates",
          icon: <DollarSign className="text-slate h-4" />,
        },
        {
          title: "Unresolved Errors",
          value: "0",
          subtitle: "Needed attention",
          icon: <AlertTriangle className="text-slate h-4" />,
        },
    ];
    

 
const recentCustomers = [
  { primary: "Air handler Pro Location #2", secondary: "10/21/2025" },
  { primary: "Brand New Site Testing", secondary: "9/24/2025" },
  { primary: "Stan Lee's Service Site", secondary: "8/8/2025" },
  { primary: "Test SH Network Site w/ parent", secondary: "7/29/2025" },
  { primary: "Test Site Name", secondary: "7/29/2025" },
];

const recentEstimates = [
  { primary: "$2,500,000", secondary: "8/21/2025" },
  { primary: "$50,000", secondary: "8/13/2025" },
  { primary: "$25,000", secondary: "8/11/2025" },
  { primary: "$125,450", secondary: "7/29/2025" },
  { primary: "$70,000", secondary: "7/29/2025" },
];

    return (
      <div>
        <StatsCardsRow stats={OverviewStats} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <RecentItemsCard title="Recent Customers" items={recentCustomers} />
          <RecentItemsCard title="Recent Estimates" items={recentEstimates} />
        </div>
      </div>
    );

}