import { EmailIcon } from "../icons/icons";
import { InputField, PasswordField } from "../shared/forms/fields";

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
      <h3 className="text-2xl font-semibold text-charcoal">Welcome Back</h3>
      <p className="text-sm text-slate">Sign in to your account to continue</p>
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
        className="w-full inline-flex items-center justify-center bg-cerulean text-white hover:bg-slate px-4 py-2 text-sm font-medium transition-colors"
      >
        Sign In
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-cerulean hover:text-slate hover:underline transition-colors"
        >
          Forgot your password?
        </button>
      </div>
    </form>
  </div>
);

export { SignInForm };
