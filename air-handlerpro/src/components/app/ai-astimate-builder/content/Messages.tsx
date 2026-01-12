import { AiBotIcon, UserIcon } from "@/components/icons/icons";
import { Message } from "@/components/interface/DataTypes";
import { ReactNode } from "react";

// Helper function to parse markdown (bold text)
const parseMarkdown = (text: string) => {
  const parts: (string | ReactNode)[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add bold text
    parts.push(
      <strong key={key++} className="font-bold">
        {match[1]}
      </strong>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

// Helper function to split text by newlines and preserve formatting
const formatText = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={index}>
      {parseMarkdown(line)}
      {index < lines.length - 1 && <br />}
    </span>
  ));
};

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-2 max-w-xl ${isUser ? "flex-row-reverse" : ""}`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? "bg-cerulean text-white" : "bg-platinum text-slate"
          }`}
        >
          {isUser ? <UserIcon /> : <AiBotIcon />}
        </div>

        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          <div
            className={`px-3 py-2 rounded-lg ${
              isUser ? "bg-cerulean text-white" : "bg-platinum text-charcoal"
            }`}
          >
            <p className="text-xs whitespace-pre-wrap">
              {formatText(message.text)}
            </p>
          </div>
          <span className="text-[10px] text-slate mt-0.5">{message.time}</span>
        </div>
      </div>
    </div>
  );
};
