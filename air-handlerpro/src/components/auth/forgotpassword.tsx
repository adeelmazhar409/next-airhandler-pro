import { EmailIcon } from "../icons/icons";
import { InputField } from "../shared/forms/fields";

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
        <h1 className="text-3xl text-charcoal font-bold">Reset Password</h1>
        <p className="text-slate mt-2">
          Enter your email to receive reset instructions
        </p>
      </div>

      <div className="bg-white border border-silver shadow-[0_0_0_1px_rgba(197,195,198,0.3),4px_4px_0_0_rgba(25,133,161,1)]">
        <div className="p-6">
          <h3 className="text-2xl text-charcoal font-semibold">
            Forgot Password
          </h3>
          <p className="text-sm text-slate mt-1">
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
                className="flex-1 inline-flex items-center justify-center bg-platinum text-charcoal hover:bg-silver px-4 py-2 text-sm font-medium transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center bg-cerulean text-white hover:bg-slate px-4 py-2 text-sm font-medium transition-colors"
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

export { ForgotPasswordForm };
