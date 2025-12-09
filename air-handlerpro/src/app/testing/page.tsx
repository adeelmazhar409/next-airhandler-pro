"use client";

import { useState } from "react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
type AuthTab = "signin" | "signup";

interface PasswordStrength {
  length: boolean;
  lower: boolean;
  upper: boolean;
  number: boolean;
  special: boolean;
  score: number;
}

// ============================================================================
// UTILITY FUNCTIONS
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

// ============================================================================
// ICON COMPONENTS
// ============================================================================
const EmailIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ============================================================================
// REUSABLE INPUT COMPONENTS
// ============================================================================

// Basic Input with Icon
const InputField = ({ 
  id, 
  type, 
  label, 
  value, 
  onChange, 
  placeholder, 
  icon 
}: {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
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
        className="flex text-neutral-500 h-10 w-full border border-neutral-200 bg-white px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
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
  minLength
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  minLength?: number;
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
          className="flex h-10 text-neutral-500 w-full border border-neutral-200 bg-white px-3 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          required
          minLength={minLength}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
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

// ============================================================================
// FORM COMPONENTS
// ============================================================================

// Sign In Form Component
const SignInForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
}: {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}) => (
  <div className="p-6">
    <div className="text-center mb-6">
      <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
      <p className="text-sm text-neutral-500">Sign in to your account to continue</p>
    </div>
    <form onSubmit={onSubmit} className="space-y-4">
      <InputField
        id="signin-email"
        type="email"
        label="Email"
        value={email}
        onChange={onEmailChange}
        placeholder="Enter your email"
        icon={<EmailIcon />}
      />

      <PasswordField
        id="signin-password"
        label="Password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Enter your password"
      />

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 text-sm font-medium"
      >
        Sign In
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-neutral-900 hover:underline"
        >
          Forgot your password?
        </button>
      </div>
    </form>
  </div>
);

// Sign Up Form Component
const SignUpForm = ({
  email,
  password,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  const pwdInfo = getPasswordInfo(password);

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-black">Create Account</h3>
        <p className="text-sm text-neutral-500">Get started with your CRM today</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          id="signup-email"
          type="email"
          label="Email"
          value={email}
          onChange={onEmailChange}
          placeholder="Enter your email"
          icon={<EmailIcon />}
        />

        <div>
          <PasswordField
            id="signup-password"
            label="Password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Create a password"
            minLength={8}
          />
          {password && <PasswordStrengthMeter pwdInfo={pwdInfo} />}
        </div>

        <PasswordField
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          placeholder="Confirm your password"
          minLength={8}
        />

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 text-sm font-medium"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

// Forgot Password Form Component
const ForgotPasswordForm = ({
  email,
  onEmailChange,
  onSubmit,
  onBack,
}: {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) => (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl text-black font-bold">Reset Password</h1>
        <p className="text-neutral-500 mt-2">
          Enter your email to receive reset instructions
        </p>
      </div>

      <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)]">
        <div className="p-6">
          <h3 className="text-2xl text-black font-semibold">Forgot Password</h3>
          <p className="text-sm text-neutral-500 mt-1">
            We'll send you a link to reset your password
          </p>
        </div>

        <div className="px-6 pb-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <InputField
              id="reset-email"
              type="email"
              label="Email Address"
              value={email}
              onChange={onEmailChange}
              placeholder="Enter your email"
              icon={<EmailIcon />}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 inline-flex items-center justify-center bg-neutral-100 text-neutral-900 hover:bg-neutral-200 px-4 py-2 text-sm font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 text-sm font-medium"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN AUTH COMPONENT
// ============================================================================
export default function Auth() {
  // State Management
  const [activeTab, setActiveTab] = useState<AuthTab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Form Handlers
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", email, password);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up:", email, password, confirmPassword);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", resetEmail);
  };

  // Show Forgot Password Screen
  if (showForgotPassword) {
    return (
      <ForgotPasswordForm
        email={resetEmail}
        onEmailChange={(e) => setResetEmail(e.target.value)}
        onSubmit={handleForgotPassword}
        onBack={() => setShowForgotPassword(false)}
      />
    );
  }

  // Main Auth Screen
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Customer Database</h1>
          <p className="text-neutral-500 mt-2">
            Access your CRM and manage your business
          </p>
        </div>

        {/* Card with Tabs and Forms */}
        <div className="bg-white border border-black/40 shadow-[0_0_0_1px_rgba(0,0,0,0.1),4px_4px_0_0_rgba(0,0,0,1)]">
          {/* Tab Switcher */}
          <div className="p-6 pb-0">
            <div className="inline-flex h-10 items-center justify-center bg-neutral-100 p-1 text-neutral-500 w-full">
              <button
                onClick={() => setActiveTab("signin")}
                className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all flex-1 ${
                  activeTab === "signin"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "hover:text-neutral-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all flex-1 ${
                  activeTab === "signup"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "hover:text-neutral-900"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Render Active Form */}
          {activeTab === "signin" && (
            <SignInForm
              email={email}
              password={password}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={handleSignIn}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          )}

          {activeTab === "signup" && (
            <SignUpForm
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
              onSubmit={handleSignUp}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-neutral-500">
          <p>
            By signing up, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}