import { EmailIcon } from "../icons/icons";
import {
  InputField,
  PasswordField,
  PasswordStrengthMeter,
} from "../shared/forms/fields";
import { getPasswordInfo } from "../utility/HelperFunctions";

// Sign Up Form Component
const SignUpForm = ({
  email,
  password,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  loading = false,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}) => {
  const pwdInfo = getPasswordInfo(password);

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-charcoal">Create Account</h3>
        <p className="text-sm text-slate">Get started with your CRM today</p>
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
          disabled={loading}
        />

        <div>
          <PasswordField
            id="signup-password"
            label="Password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Create a password"
            minLength={8}
            disabled={loading}
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
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center bg-cerulean text-white hover:bg-slate px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export { SignUpForm };
