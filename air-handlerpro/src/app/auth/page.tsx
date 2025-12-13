"use client";

import { useState } from "react";
import { SignInForm } from "@/components/auth/signin";
import { SignUpForm } from "@/components/auth/signup";
import { ForgotPasswordForm } from "@/components/auth/forgotpassword";

// ============================================================================
// MAIN AUTH COMPONENT
// ============================================================================
export default function Auth() {
  // State Management
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Form Handlers
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", email, password);
      window.location.assign("/system");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up:", email, password, confirmPassword);
      window.location.assign("/system");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", resetEmail);
      window.location.assign("/system");
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
                onClick={() => setActiveTab("signin") }
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
              onConfirmPasswordChange={(e) =>
                setConfirmPassword(e.target.value)
              }
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
