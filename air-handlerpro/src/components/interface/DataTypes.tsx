interface PasswordStrength {
  length: boolean;
  lower: boolean;
  upper: boolean;
  number: boolean;
  special: boolean;
  score: number;
}

interface StatData {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  alert?: boolean;
  hoverable?: boolean;
}

interface StatsCardsRowProps {
  stats: StatData[];
}

type InputFieldType = "search" | "dropdownButton" | "filterButton" | "sortButton" | "gridButton" | "listButton";
interface InputField {
  type: InputFieldType;
  placeholder?: string;
  name?: string;
  options?: (string | number)[];
  disable?: boolean;
  show?: boolean;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
  onClick?: () => void;
}

interface Message {
  type: "user" | "assistant";
  text: string;
  time: string;
}

export type { PasswordStrength, StatsCardsRowProps, InputField, Message };
