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

export { ForgotPasswordForm };