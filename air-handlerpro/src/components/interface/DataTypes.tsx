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

type InputFieldType =
  | "search"
  | "dropdownButton"
  | "filterButton"
  | "sortButton"
  | "gridButton"
  | "listButton";

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

interface FieldConfig {
  label: string;
  nature: string;
  type: string;
  placeholder?: string;
  option?: string[];
  buttonName?: string;
  message?: string;
  sectionName?: string;
  button?: string[];
  rows?: number;
  multiple?: boolean;
  accept?: string;
  modal?: ModalConfig;
}

interface ModalConfig {
  modalHeading: string;
  modalFields: (FieldConfig | ModalSection)[];
}

interface ModalSection {
  sectionName: string;
  fields?: FieldConfig[];
  button?: string[];
}

interface SectionConfig {
  sectionName: string;
  Icon?: React.ReactNode;
  sectionBorder?: boolean;
  fields?: FieldConfig[];
  button?: string[];
}

interface DynamicFormBuilderProps {
  config: (SectionConfig | FieldConfig)[];
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  config: ModalConfig;
  backgroundColor?: string;
}

export type {
  PasswordStrength,
  StatsCardsRowProps,
  InputField,
  Message,
  DynamicModalProps,
  ModalConfig,
  FieldConfig,
  SectionConfig,
  DynamicFormBuilderProps,
  ModalSection
};
