"use client";

import { useState } from "react";
import { HeaderAndChatTab } from "./content/Header&ChatTab";
import { ChatInput } from "./content/ChatInput";
import { EstimatePreview } from "./content/EstimatePreview";
import { Message } from "@/components/interface/DataTypes";
import { MessageBubble } from "./content/Messages";

// Main Component
export default function AIEstimateBuilder() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "user",
      text: "choose any of the customer",
      time: "03:39 PM",
    },
    {
      type: "assistant",
      text: "I need a specific customer name to search for them. Please tell me which customer you'd like me to choose.",
      time: "03:39 PM",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        type: "user",
        text: inputValue,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex  bg-gray-50">
      <div className="flex-1 flex flex-col ">
        <HeaderAndChatTab />

        <div className="flex-1 border-r border-black/30 border-l overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </div>

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
        />
      </div>

      <EstimatePreview />
    </div>
  );
}
