
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
export { getPasswordInfo, getStrengthLabel, getFieldWidth };
