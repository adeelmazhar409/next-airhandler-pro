"use client";

import { useState } from "react";
import { SignInForm } from "@/components/auth/signin";
import { SignUpForm } from "@/components/auth/signup";
import { ForgotPasswordForm } from "@/components/auth/forgotpassword";
import { supabase } from "@/lib/supabase";

// ============================================================================
// MAIN AUTH COMPONENT - IMPROVED ERROR HANDLING VERSION
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
  const [successMessage, setSuccessMessage] = useState("");

  // // Form Handlers
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Client-side validation
    if (!email || !email.includes("@")) {
      setError("Your email address is incorrect or invalid");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError(
        "Your password is incorrect or too short (minimum 6 characters)"
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Parse Supabase error to provide specific feedback
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          // This error means either email or password (or both) are wrong
          setError(
            "Your email or password is incorrect. Please check both fields and try again"
          );
        } else if (
          error.message.toLowerCase().includes("email not confirmed")
        ) {
          setError(
            "Please verify your email before signing in. Check your inbox for the verification link."
          );
        } else if (error.message.toLowerCase().includes("email")) {
          setError("Your email address is incorrect or not registered");
        } else if (error.message.toLowerCase().includes("password")) {
          setError("Your password is incorrect");
        } else {
          setError(error.message);
        }
        console.error("Sign in error:", error);
        return;
      }

      if (data.user) {
        console.log("Sign in successful:", data.user);

        // FIX: Check if email is verified before allowing access
        if (!data.user.email_confirmed_at) {
          setError(
            "Please verify your email before signing in. Check your inbox for the verification link."
          );
          await supabase.auth.signOut(); // Sign them out
          return;
        }

        // Only redirect if email is verified
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
    setSuccessMessage("");

    // Enhanced client-side validation for sign-up
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Your email address is invalid. Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Your password is required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(
        "Your password is too short. It must be at least 6 characters long"
      );
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(
        "Your passwords do not match. Please make sure both password fields are identical"
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // Parse Supabase error to provide specific feedback
        if (error.message.toLowerCase().includes("email")) {
          setError("Your email address is invalid or already registered");
        } else if (error.message.toLowerCase().includes("password")) {
          setError(
            "Your password does not meet the requirements. Please use a stronger password"
          );
        } else {
          setError(error.message);
        }
        console.error("Sign up error:", error);
        return;
      }

      if (data.user) {
        console.log("Sign up successful:", data.user);

        // FIX: Don't redirect, show success message instead
        setSuccessMessage(
          "Account created successfully! Please check your email to verify your account before signing in."
        );

        // Clear the form
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Switch to sign in tab after 5 seconds
        setTimeout(() => {
          setActiveTab("signin");
          setSuccessMessage("");
        }, 5000);
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

    // Validate email before sending reset
    if (!resetEmail || !resetEmail.includes("@")) {
      setError("Your email address is invalid. Please enter a valid email");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email")) {
          setError(
            "Your email address was not found. Please check and try again"
          );
        } else {
          setError(error.message);
        }
        console.error("Reset password error:", error);
        return;
      }

      setSuccessMessage("Password reset link sent! Check your email inbox");
      setError(""); // Clear any previous errors
      console.log("Reset password email sent to:", resetEmail);

      // Clear form and go back after 3 seconds
      setTimeout(() => {
        setResetEmail("");
        setShowForgotPassword(false);
        setSuccessMessage("");
      }, 3000);
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
        onBack={() => {
          setShowForgotPassword(false);
          setError("");
          setSuccessMessage("");
        }}
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

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
            <p className="text-sm">{successMessage}</p>
          </div>
        )}

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
                onClick={() => {
                  setActiveTab("signin");
                  setError("");
                  setSuccessMessage("");
                }}
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
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                  setSuccessMessage("");
                }}
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
              onForgotPassword={() => {
                setShowForgotPassword(true);
                setError("");
                setSuccessMessage("");
              }}
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
              loading={loading}
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
