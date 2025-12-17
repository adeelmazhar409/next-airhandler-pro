"use client";

import { useState } from "react";
import { SignInForm } from "@/components/auth/signin";
import { SignUpForm } from "@/components/auth/signup";
import { ForgotPasswordForm } from "@/components/auth/forgotpassword";
import { supabase } from "@/lib/supabase";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Handlers
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        console.error("Sign in error:", error);
        return;
      }

      if (data.user) {
        console.log("Sign in successful:", data.user);
        window.location.assign("/system");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        console.error("Sign up error:", error);
        return;
      }

      if (data.user) {
        console.log("Sign up successful:", data.user);
        // You can customize this message based on your email confirmation settings
        setError("Check your email to confirm your account!");
        // Optionally redirect after a delay
        setTimeout(() => {
          window.location.assign("/system");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
        console.error("Reset password error:", error);
        return;
      }

      setError("Check your email for the password reset link!");
      console.log("Reset password email sent to:", resetEmail);
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-charcoal">
            Customer Database
          </h1>
          <p className="text-slate mt-2">
            Access your CRM and manage your business
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Card with Tabs and Forms */}
        <div className="bg-white border border-silver shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(25,133,161,1)]">
          {/* Tab Switcher */}
          <div className="p-6 pb-0">
            <div className="inline-flex h-10 items-center justify-center bg-platinum p-1 text-slate w-full">
              <button
                onClick={() => setActiveTab("signin")}
                disabled={loading}
                className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all flex-1 ${
                  activeTab === "signin"
                    ? "bg-cerulean text-white shadow-sm"
                    : "hover:text-charcoal"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                disabled={loading}
                className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all flex-1 ${
                  activeTab === "signup"
                    ? "bg-cerulean text-white shadow-sm"
                    : "hover:text-charcoal"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
              loading={loading}
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
        <div className="text-center text-sm text-slate">
          <p>
            By signing up, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
