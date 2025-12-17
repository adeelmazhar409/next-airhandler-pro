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

interface ModalFieldConfig {
  label: string;
  nature?: string;
  type: string;
  placeholder?: string;
  option?: string[];
  buttonName?: string;
  message?: string;
}

interface ModalConfig {
  modalHeading: string;
  modalFields: ModalFieldConfig[];
}

interface FieldConfig {
  nature: string;
  type: string;
  label: string;
  placeholder: string;
  buttonName?: string;
  option?: string[];
  modal?: ModalConfig;
}

interface SectionConfig {
  sectionName: string;
  Icon?: React.ReactNode;
  sectionBorder?: boolean;
  fields?: FieldConfig[];
  button?: string[];
}

interface DynamicFormBuilderProps {
  config: SectionConfig[];
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

export type { PasswordStrength, StatsCardsRowProps, InputField, Message, ModalFieldConfig, ModalConfig ,FieldConfig, SectionConfig, DynamicFormBuilderProps};
