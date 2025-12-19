import Actbox from "../../UI-components/Actbox";
import { Check } from "lucide-react";
export default function ErrorLogs() {
  const value = {
    header: true,
    value: "Error Logs",
    headerIcon: <Check />,
    icon: <Check className="text-green-700" />,
    description: "System is running smoothly!",
  };
  return (
    <div className="w-full p-4">
      <Actbox {...value} />
    </div>
  );
}
