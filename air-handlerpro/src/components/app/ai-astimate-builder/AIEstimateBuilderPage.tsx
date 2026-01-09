"use client";

import { useState, useRef, useEffect } from "react";
import { HeaderAndChatTab } from "./content/Header&ChatTab";
import { ChatInput } from "./content/ChatInput";
import { EstimatePreview } from "./content/EstimatePreview";
import { Message } from "@/components/interface/DataTypes";
import { MessageBubble } from "./content/Messages";
import { base } from "@/service/base";
import { toast } from "@/components/toast";
import { supabase } from "@/lib/supabase";

interface Company {
  id: string;
  business_name: string;
  industry?: string;
  phone_number?: string;
}

interface Site {
  id: string;
  site_name: string;
  service_address: string;
}

interface EstimateData {
  customerCompanyId: string;
  customerSiteId: string;
  estimateName: string;
  estimateNumber: string;
  contractLength: number;
  contractStartDate: string;
  billingFrequency: string;
  milesToSite: number;
  travelCharge: number;
  parkingFees: number;
  status: string;
  totalAmount: number;
  created_by?: string;
}

type ConversationStep =
  | "initial"
  | "company_search"
  | "company_confirm"
  | "site_select"
  | "estimate_name"
  | "contract_length"
  | "start_date"
  | "billing_frequency"
  | "travel_info"
  | "review"
  | "complete";

interface AIEstimateBuilderProps {
  onNavigateBack?: () => void;
}

export default function AIEstimateBuilder({
  onNavigateBack,
}: AIEstimateBuilderProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      text: "Hello! I'm your AI Estimate Builder assistant. I'll help you create a maintenance estimate.\n\nTo get started, please tell me the name of the customer company you want to create an estimate for.",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationStep, setConversationStep] =
    useState<ConversationStep>("initial");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [estimateData, setEstimateData] = useState<Partial<EstimateData>>({});
  const [createdEstimateId, setCreatedEstimateId] = useState<string | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add message helper
  const addMessage = (type: "user" | "assistant", text: string) => {
    const newMessage: Message = {
      type,
      text,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Process user input based on conversation step
  const processUserInput = async (userInput: string) => {
    setIsProcessing(true);

    switch (conversationStep) {
      case "initial":
      case "company_search": {
        // Search for companies
        const result = await base("fetch", "company");
        if (result.success && result.data) {
          const matchedCompanies = result.data.filter((company: Company) =>
            company.business_name
              .toLowerCase()
              .includes(userInput.toLowerCase())
          );

          if (matchedCompanies.length === 0) {
            addMessage(
              "assistant",
              `I couldn't find any companies matching "${userInput}". Please try again with a different company name.`
            );
          } else if (matchedCompanies.length === 1) {
            setSelectedCompany(matchedCompanies[0]);
            setCompanies(matchedCompanies);
            addMessage(
              "assistant",
              `Great! I found: **${matchedCompanies[0].business_name}**\n\nIs this the correct company? (Reply "yes" or "no")`
            );
            setConversationStep("company_confirm");
          } else {
            setCompanies(matchedCompanies);
            const companyList = matchedCompanies
              .map((c: Company, i: number) => `${i + 1}. ${c.business_name}`)
              .join("\n");
            addMessage(
              "assistant",
              `I found multiple companies:\n\n${companyList}\n\nPlease reply with the number of the company you want.`
            );
            setConversationStep("company_confirm");
          }
        } else {
          addMessage(
            "assistant",
            "Sorry, I couldn't fetch companies at this time. Please try again."
          );
        }
        break;
      }

      case "company_confirm": {
        const input = userInput.toLowerCase().trim();
        if (input === "yes" && selectedCompany) {
          // Fetch sites for the company
          const result = await base("fetch", "site");
          if (result.success && result.data) {
            const companySites = result.data.filter(
              (site: any) => site.parent_company_id === selectedCompany.id
            );

            if (companySites.length === 0) {
              addMessage(
                "assistant",
                "This company has no service sites. Please add sites first."
              );
              setConversationStep("initial");
            } else {
              setSites(companySites);
              const siteList = companySites
                .map((s: Site, i: number) => `${i + 1}. ${s.site_name}`)
                .join("\n");
              addMessage(
                "assistant",
                `Perfect! Please select a site:\n\n${siteList}\n\nReply with the site number.`
              );
              setConversationStep("site_select");
            }
          }
        } else if (input === "no") {
          addMessage(
            "assistant",
            "No problem! What company would you like to create an estimate for?"
          );
          setConversationStep("company_search");
          setSelectedCompany(null);
        } else if (!isNaN(parseInt(input))) {
          const index = parseInt(input) - 1;
          if (index >= 0 && index < companies.length) {
            setSelectedCompany(companies[index]);
            addMessage(
              "assistant",
              `Great! You selected: **${companies[index].business_name}**\n\nIs this correct? (Reply "yes" or "no")`
            );
          } else {
            addMessage("assistant", "Invalid number. Please try again.");
          }
        } else {
          addMessage(
            "assistant",
            'Please reply "yes", "no", or select a number from the list.'
          );
        }
        break;
      }

      case "site_select": {
        const siteIndex = parseInt(userInput) - 1;
        if (!isNaN(siteIndex) && siteIndex >= 0 && siteIndex < sites.length) {
          setSelectedSite(sites[siteIndex]);
          setEstimateData((prev) => ({
            ...prev,
            customerCompanyId: selectedCompany?.id,
            customerSiteId: sites[siteIndex].id,
          }));
          addMessage(
            "assistant",
            `Perfect! Site selected: **${sites[siteIndex].site_name}**\n\nNow, what would you like to name this estimate?`
          );
          setConversationStep("estimate_name");
        } else {
          addMessage("assistant", "Invalid site number. Please try again.");
        }
        break;
      }

      case "estimate_name": {
        setEstimateData((prev) => ({
          ...prev,
          estimateName: userInput,
          estimateNumber: `EST-${Date.now()}`,
        }));
        addMessage(
          "assistant",
          `Great! Estimate name: **${userInput}**\n\nHow many months should the contract be? (Enter a number)`
        );
        setConversationStep("contract_length");
        break;
      }

      case "contract_length": {
        const months = parseInt(userInput);
        if (isNaN(months) || months <= 0) {
          addMessage(
            "assistant",
            "Please enter a valid number of months (e.g., 12 for one year)."
          );
        } else {
          setEstimateData((prev) => ({ ...prev, contractLength: months }));
          addMessage(
            "assistant",
            `Perfect! Contract length: **${months} months**\n\nWhat should be the contract start date? (Format: YYYY-MM-DD)`
          );
          setConversationStep("start_date");
        }
        break;
      }

      case "start_date": {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(userInput)) {
          addMessage(
            "assistant",
            "Please use the format YYYY-MM-DD (e.g., 2024-01-15)."
          );
        } else {
          setEstimateData((prev) => ({
            ...prev,
            contractStartDate: userInput,
          }));
          addMessage(
            "assistant",
            `Start date set: **${userInput}**\n\nWhat billing frequency would you like?\n\nOptions: Monthly, Quarterly, Bi-Annual, or Annual`
          );
          setConversationStep("billing_frequency");
        }
        break;
      }

      case "billing_frequency": {
        const input = userInput.toLowerCase().trim();

        // Map user input to database values
        const frequencyMap: Record<string, string> = {
          monthly: "Monthly",
          quarterly: "Quarterly",
          "bi-annual": "Bi-Annual",
          biannual: "Bi-Annual",
          annual: "Annual",
          yearly: "Annual",
        };

        const dbValue = frequencyMap[input];

        if (dbValue) {
          setEstimateData((prev) => ({
            ...prev,
            billingFrequency: dbValue,
          }));

          addMessage(
            "assistant",
            `Billing frequency: **${dbValue}**\n\nHow many miles to the site? (Enter 0 if not applicable)`
          );
          setConversationStep("travel_info");
        } else {
          addMessage(
            "assistant",
            "Please choose: Monthly, Quarterly, Bi-Annual, or Annual."
          );
        }
        break;
      }

      case "travel_info": {
        const miles = parseFloat(userInput);
        if (isNaN(miles) || miles < 0) {
          addMessage("assistant", "Please enter a valid number for miles.");
        } else {
          setEstimateData((prev) => ({
            ...prev,
            milesToSite: miles,
            travelCharge: 0,
            parkingFees: 0,
            status: "draft",
            totalAmount: 0,
          }));

          const review = `
Perfect! Let me review the estimate details:

**Customer:** ${selectedCompany?.business_name}
**Site:** ${selectedSite?.site_name}
**Estimate Name:** ${estimateData.estimateName}
**Estimate Number:** ${estimateData.estimateNumber}
**Contract Length:** ${estimateData.contractLength} months
**Start Date:** ${estimateData.contractStartDate}
**Billing Frequency:** ${estimateData.billingFrequency}
**Miles to Site:** ${miles}

Everything look correct? Reply "yes" to create the estimate or "no" to start over.
          `.trim();

          addMessage("assistant", review);
          setConversationStep("review");
        }
        break;
      }

      case "review": {
        const input = userInput.toLowerCase().trim();
        if (input === "yes") {
          try {
            // Get current user
            const {
              data: { user },
              error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
              addMessage(
                "assistant",
                "❌ Authentication error. Please make sure you're logged in."
              );
              setConversationStep("initial");
              setIsProcessing(false);
              return;
            }

            // Add created_by to estimate data
            const finalEstimateData = {
              ...estimateData,
              created_by: user.id,
            };

            const result = await base(
              "create",
              "maintenanceEstimate",
              finalEstimateData
            );

            if (result.success) {
              setCreatedEstimateId(result.data?.id || null);
              addMessage(
                "assistant",
                `🎉 Success! Your maintenance estimate has been created!\n\n**Estimate Number:** ${estimateData.estimateNumber}\n\nThe estimate has been saved as a draft. You can now save or view it using the buttons on the right.`
              );
              toast("✅ Estimate created successfully!");
              setConversationStep("complete");
            } else {
              addMessage(
                "assistant",
                `❌ Sorry, there was an error creating the estimate: ${result.error}\n\nPlease try again.`
              );
              setConversationStep("initial");
            }
          } catch (error) {
            addMessage(
              "assistant",
              "❌ An unexpected error occurred. Please try again."
            );
            setConversationStep("initial");
          }
        } else if (input === "no") {
          addMessage(
            "assistant",
            "No problem! Let's start over. What company would you like to create an estimate for?"
          );
          setConversationStep("company_search");
          setSelectedCompany(null);
          setSelectedSite(null);
          setEstimateData({});
        } else {
          addMessage(
            "assistant",
            'Please reply "yes" to confirm or "no" to start over.'
          );
        }
        break;
      }

      case "complete": {
        addMessage(
          "assistant",
          "Would you like to create another estimate? If so, tell me the company name!"
        );
        setConversationStep("company_search");
        setSelectedCompany(null);
        setSelectedSite(null);
        setEstimateData({});
        setCreatedEstimateId(null);
        break;
      }
    }

    setIsProcessing(false);
  };

  const handleSend = async () => {
    if (inputValue.trim() && !isProcessing) {
      const userInput = inputValue.trim();
      addMessage("user", userInput);
      setInputValue("");
      await processUserInput(userInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        type: "assistant",
        text: "Hello! I'm your AI Estimate Builder assistant. I'll help you create a maintenance estimate.\n\nTo get started, please tell me the name of the customer company you want to create an estimate for.",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setConversationStep("initial");
    setSelectedCompany(null);
    setSelectedSite(null);
    setEstimateData({});
    setCompanies([]);
    setSites([]);
    setCreatedEstimateId(null);
  };

  const handleSaveDraft = async () => {
    if (createdEstimateId) {
      toast("✅ Estimate already saved as draft!");
    } else {
      toast("⚠️ Please complete the estimate first.");
    }
  };

  const handleViewEstimate = () => {
    if (createdEstimateId && onNavigateBack) {
      toast("📋 Navigating to Maintenance Estimate Pro...");
      onNavigateBack();
    } else {
      toast("⚠️ Please complete the estimate first.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side - Chat (takes remaining space) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed */}
        <HeaderAndChatTab onClear={handleClear} onBack={onNavigateBack} />

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-slate">
              <div className="animate-pulse">●</div>
              <div className="animate-pulse delay-100">●</div>
              <div className="animate-pulse delay-200">●</div>
              <span className="text-sm ml-2">AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Fixed at bottom */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          disabled={isProcessing}
        />
      </div>

      {/* Right Side - Preview (Fixed width) */}
      <EstimatePreview
        selectedCompany={selectedCompany}
        selectedSite={selectedSite}
        estimateData={estimateData}
        conversationStep={conversationStep}
        onSaveDraft={handleSaveDraft}
        onViewEstimate={handleViewEstimate}
      />
    </div>
  );
}
