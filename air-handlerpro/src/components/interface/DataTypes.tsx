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
  | "listButton"
  | "dropdownbutton2"
  | "Checkbox";

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

interface Activity {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  type: "note" | "meeting" | "task";
  completedDate?: string;
  dueDate?: string;
}

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

interface Message {
  type: "user" | "assistant";
  text: string;
  time: string;
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

interface FieldConfig {
  Title: string;
  label: string;
  nature: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  hourplaceholder?: string;
  minuteplaceholder?: string;
  option?: string[];
  linkTable?: string;
  linkTableValue2?: string;
  linkTableValue?: string | string[];
  box?: object[];
  optionDescription?: string[];
  optionColors?: Record<string, string>;
  buttonName?: string;
  message?: string;
  button?: string[];
  radioColor?: Record<string, string>;
  nativeOption?: { value: string; label: string }[];
  activeDependence?: string;
  dataDependence?: {
    field: string;
    dataMapping: { value: string; linkTable: string; linkTableValue: string }[];
  };
  rows?: number;
  multiple?: boolean;
  accept?: string;
  modal?: ModalConfig;
}

interface SectionConfig {
  sectionName: string;
  Icon?: React.ReactNode;
  sectionBorder?: boolean;
  fields?: FieldConfig[];
  button?: string[];
}

interface  DynamicFormBuilderProps {
  linkTableData?: any[];
  editingData: any | null;
  config: (SectionConfig | FieldConfig)[];
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

// Type guard functions to help TypeScript distinguish between types
export function isSectionConfig(
  item: SectionConfig | FieldConfig
): item is SectionConfig {
  return "fields" in item || ("sectionName" in item && "button" in item);
}

export function isFieldConfig(
  item: SectionConfig | FieldConfig
): item is FieldConfig {
  return "label" in item && "nature" in item && "type" in item;
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
  ModalSection,
  Note,
  Activity,
};
