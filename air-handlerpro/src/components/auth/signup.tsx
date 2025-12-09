import { EmailIcon } from "../icons/icons";
import { InputField, PasswordField, PasswordStrengthMeter } from "../shared/forms/fields";
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
          <p className="text-sm text-neutral-500">
            Get started with your CRM today
          </p>
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

export { SignUpForm };