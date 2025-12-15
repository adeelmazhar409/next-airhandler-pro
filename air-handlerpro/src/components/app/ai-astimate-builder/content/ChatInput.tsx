import { ChatInputIcon } from "@/components/icons/icons";

export const ChatInput = ({
  value,
  onChange,
  onSend,
  onKeyPress,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}) => (
  <div className="bg-white border border-silver px-4 py-3">
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Tell me about your customer and the equipment you need to maintain..."
        className="flex-1 px-3 py-2 border border-silver rounded-lg text-xs text-charcoal placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean transition-colors"
      />
      <button
        onClick={onSend}
        className="px-4 py-2 bg-cerulean text-white rounded-lg hover:bg-slate transition-colors"
      >
        <ChatInputIcon />
      </button>
    </div>
    <p className="text-[10px] text-slate mt-1.5 text-center">
      Press Enter to send, Shift+Enter for new line
    </p>
  </div>
);
