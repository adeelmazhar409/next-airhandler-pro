// ============================================================================
// REUSABLE INPUT COMPONENTS
// ============================================================================

import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon, XIcon } from "@/components/icons/icons";
import { getStrengthLabel } from "@/components/utility/HelperFunctions";
import { useState } from "react";
import { PasswordStrength } from "@/components/interface/DataTypes";

// Basic Input with Icon
const InputField = ({
    id,
    type,
    label,
    value,
    onChange,
    placeholder,
    icon,
    disabled = false,
  }: {
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
    disabled?: boolean;
  }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-black font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="flex text-neutral-500 h-10 w-full border border-neutral-200 bg-white px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
      </div>
    </div>
  );
  
  // Password Input with Show/Hide Toggle
  const PasswordField = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    minLength,
    disabled = false,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    minLength?: number;
    disabled?: boolean;
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm text-black font-medium">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
            <LockIcon />
          </div>
          <input
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="flex h-10 text-neutral-500 w-full border border-neutral-200 bg-white px-3 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            required
            minLength={minLength}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
    );
  };
  
  // Password Strength Indicator
  const PasswordStrengthMeter = ({ pwdInfo }: { pwdInfo: PasswordStrength }) => {
    const requirements = [
      { label: "8+ characters", met: pwdInfo.length },
      { label: "Lowercase", met: pwdInfo.lower },
      { label: "Uppercase", met: pwdInfo.upper },
      { label: "Number", met: pwdInfo.number },
      { label: "Special char", met: pwdInfo.special },
    ];
  
    return (
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Password strength: {getStrengthLabel(pwdInfo.score)}</span>
          <span>{pwdInfo.score}%</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden bg-neutral-200">
          <div
            className="h-full bg-neutral-900 transition-all"
            style={{ width: `${pwdInfo.score}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {requirements.map((req, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 ${
                req.met ? "text-green-600" : "text-neutral-400"
              }`}
            >
              {req.met ? <CheckIcon /> : <XIcon />}
              {req.label}
            </div>
          ))}
        </div>
      </div>
    );
  };

export { InputField, PasswordField, PasswordStrengthMeter };