// ============================================================================
// UTILITY FUNCTIONS

import { PasswordStrength } from "../interface/DataTypes";

// ============================================================================
const getPasswordInfo = (pwd: string): PasswordStrength => {
  const length = pwd.length >= 8;
  const lower = /[a-z]/.test(pwd);
  const upper = /[A-Z]/.test(pwd);
  const number = /[0-9]/.test(pwd);
  const special = /[^A-Za-z0-9]/.test(pwd);
  const passed = [length, lower, upper, number, special].filter(Boolean).length;
  const score = Math.min(100, passed * 20);
  return { length, lower, upper, number, special, score };
};

const getStrengthLabel = (score: number): string => {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Weak";
};

const getFieldWidth = (nature: string) => {
  switch (nature) {
    case "full":
      return "w-full";
    case "half":
      return "w-full lg:w-[calc(50%-8px)]";
    case "third":
      return "w-full lg:w-[calc(33.333%-11px)]";
    default:
      return "w-full";
  }
};

// Generate hour options (12-hour format)
const generateHourOptions = () => {
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push(`${i.toString().padStart(2, "0")} AM`);
  }
  for (let i = 1; i <= 12; i++) {
    hours.push(`${i.toString().padStart(2, "0")} PM`);
  }
  return hours;
};

// Generate minute options
const generateMinuteOptions = () => {
  const minutes = [];
  for (let i = 0; i < 60; i += 5) {
    minutes.push(i.toString().padStart(2, "0"));
  }
  return minutes;
};

const getDisplayOptions = (
  linkTableData: any[],
  linkTable?: string
) => {
  if (!linkTableData || !linkTable) return [];

  return linkTableData
    .map(item => item?.[linkTable])
    .filter(Boolean)
    .flat();
}

const getDisplayValue = (
  displayOptions: any[],
  value: string | any[],
  linkTableValue: string | string[]
) => {
  const displayValue = displayOptions?.find(opt => opt?.id === value);

  if (!displayValue) return "";

  return Array.isArray(linkTableValue)
    ? linkTableValue.map(k => displayValue[k]).join(" ")
    : displayValue[linkTableValue];
}


export {
  getPasswordInfo,
  getStrengthLabel,
  getFieldWidth,
  generateHourOptions,
  generateMinuteOptions,
  getDisplayOptions,
  getDisplayValue,
};
