import { AiBotIcon, UserIcon } from "@/components/icons/icons";
import { Message } from "@/components/interface/DataTypes";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-2 max-w-xl ${isUser ? "flex-row-reverse" : ""}`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {isUser ? <UserIcon /> : <AiBotIcon />}
        </div>

        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`px-3 py-2 rounded-lg ${
              isUser ? "bg-black text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            <p className="text-xs">{message.text}</p>
          </div>
          <span className="text-[10px] text-gray-500 mt-0.5">
            {message.time}
          </span>
        </div>
      </div>
    </div>
  );
};
