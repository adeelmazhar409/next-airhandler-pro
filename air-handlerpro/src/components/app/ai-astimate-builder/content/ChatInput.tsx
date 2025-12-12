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
    <div className="bg-white border  border-black/30 px-4 py-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Tell me about your customer and the equipment you need to maintain..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={onSend}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChatInputIcon />
        </button>
      </div>
      <p className="text-[10px] text-gray-500 mt-1.5 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );