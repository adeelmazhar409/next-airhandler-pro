import { ChatInputIcon } from "@/components/icons/icons";

export const ChatInput = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}) => (
  <div className="bg-white border border-silver px-4 py-3">
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        disabled={disabled}
        placeholder="Tell me about the company you want to create an estimate for..."
        className="flex-1 px-3 py-2 border border-silver rounded-lg text-xs text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-slate transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChatInputIcon />
      </button>
    </div>
    <p className="text-[10px] text-slate mt-1.5 text-center">
      {disabled ? "AI is processing..." : "Press Enter to send"}
    </p>
  </div>
);
