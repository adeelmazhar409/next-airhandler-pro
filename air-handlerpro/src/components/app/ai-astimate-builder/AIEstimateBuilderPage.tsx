"use client";

import { useState } from "react";
import Heading from "../Heading";

// Types
interface Message {
  type: "user" | "assistant";
  text: string;
  time: string;
}



const Header = () => (
  <div className="bg-white border border-black/30 px-4 py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
       
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            AI Estimate Builder
          </h1>
          <p className="text-xs text-gray-500">
            Create and review your maintenance estimate
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear Chat
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Estimates
        </button>
      </div>
    </div>
  </div>
);

const ChatTab = () => (
  <div className="bg-white border-r border-l border-black/30 border-b px-4">
    <button className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      Chat
    </button>
  </div>
);

const MessageBubble = ({ message }: { message: Message }) => {
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
          {isUser ? (
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          )}
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

const ChatInput = ({
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
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
    <p className="text-[10px] text-gray-500 mt-1.5 text-center">
      Press Enter to send, Shift+Enter for new line
    </p>
  </div>
);

const SidebarSection = ({
  title,
  icon,
  badge,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        {icon}
        <h3 className="font-semibold text-gray-900 text-xs">{title}</h3>
      </div>
      {badge && (
        <span className="text-[10px] text-gray-500 bg-yellow-50 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const ProgressItem = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-600">{label}</span>
    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
  </div>
);

const Sidebar = () => (
  <div className="w-80 bg-white border border-black/30 flex flex-col pt-10">
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-1.5 text-gray-700">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="font-semibold text-sm">Estimate Preview</h2>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      <SidebarSection title="Customer" badge="Pending" icon={null}>
        <p className="text-xs text-gray-500">
          Waiting for customer information...
        </p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <SidebarSection
        title="Equipment"
        icon={
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
        badge="0 items"
      >
        <p className="text-xs text-gray-500">No equipment configured yet</p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <SidebarSection
        title="Schedule"
        badge="Pending"
        icon={
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
      >
        <p className="text-xs text-gray-500">Schedule not defined yet</p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <SidebarSection
        title="Estimated Cost"
        icon={
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      >
        <p className="text-xs text-gray-500">
          Cost will be calculated when all information is provided
        </p>
      </SidebarSection>

      <div className="border-t border-gray-200" />

      <div>
        <h3 className="font-semibold text-gray-900 mb-3 text-xs">Progress</h3>
        <div className="space-y-2">
          <ProgressItem label="Customer Info" />
          <ProgressItem label="Equipment" />
          <ProgressItem label="Schedule" />
        </div>
      </div>
    </div>

    <div className="px-4 py-3 border-t border-gray-200 space-y-2">
      <button className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
        Save Draft
      </button>
      <button className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors">
        View Estimate
      </button>
    </div>
  </div>
);

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
        <Header />
        <ChatTab />

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

      <Sidebar />
    </div>
  );
}
