"use client";

import { useState, useRef, useEffect } from "react";
import { HeaderAndChatTab } from "./content/Header&ChatTab";
import { ChatInput } from "./content/ChatInput";
import { EstimatePreview } from "./content/EstimatePreview";
import { Message } from "@/components/interface/DataTypes";
import { MessageBubble } from "./content/Messages";
import { base } from "@/service/base";
import { toast } from "@/components/toast";

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

export default function AIEstimateBuilder() {
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

  // Search companies in database
  const searchCompanies = async (searchTerm: string) => {
    try {
      const result = await base("fetch", "company");
      if (result.success && result.data) {
        const allCompanies = result.data as Company[];
        const filtered = allCompanies.filter((company) =>
          company.business_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered;
      }
      return [];
    } catch (error) {
      console.error("Error searching companies:", error);
      return [];
    }
  };

  // Fetch sites for a company
  const fetchCompanySites = async (companyId: string) => {
    try {
      const result = await base("fetch", "site");
      if (result.success && result.data) {
        const allSites = result.data as Site[];
        // Note: You'll need to filter by company if your sites table has company relationship
        return allSites;
      }
      return [];
    } catch (error) {
      console.error("Error fetching sites:", error);
      return [];
    }
  };

  // Generate estimate number
  const generateEstimateNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `EST-${year}-${random}`;
  };

  // Process user input based on conversation step
  const processUserInput = async (userInput: string) => {
    setIsProcessing(true);

    switch (conversationStep) {
      case "initial":
      case "company_search": {
        // Search for company
        const foundCompanies = await searchCompanies(userInput);

        if (foundCompanies.length === 0) {
          addMessage(
            "assistant",
            `I couldn't find any company matching "${userInput}". Please try again with a different name, or check the spelling.`
          );
          setConversationStep("company_search");
        } else if (foundCompanies.length === 1) {
          // Exact match
          const company = foundCompanies[0];
          setSelectedCompany(company);
          setCompanies([company]);
          addMessage(
            "assistant",
            `I found: **${company.business_name}**\n${
              company.industry ? `Industry: ${company.industry}\n` : ""
            }${
              company.phone_number ? `Phone: ${company.phone_number}\n` : ""
            }\nIs this the correct company? (Reply "yes" to confirm or "no" to search again)`
          );
          setConversationStep("company_confirm");
        } else {
          // Multiple matches
          setCompanies(foundCompanies);
          const companyList = foundCompanies
            .slice(0, 5)
            .map((c, i) => `${i + 1}. ${c.business_name}`)
            .join("\n");
          addMessage(
            "assistant",
            `I found ${foundCompanies.length} companies matching "${userInput}":\n\n${companyList}\n\nPlease type the number or exact name of the company you want.`
          );
          setConversationStep("company_confirm");
        }
        break;
      }

      case "company_confirm": {
        const input = userInput.toLowerCase().trim();

        if (input === "yes" && selectedCompany) {
          // Fetch sites for this company
          const companySites = await fetchCompanySites(selectedCompany.id);
          setSites(companySites);

          if (companySites.length === 0) {
            addMessage(
              "assistant",
              "This company has no service sites in the system. Please add a service site first, or choose a different company."
            );
            setConversationStep("company_search");
            setSelectedCompany(null);
          } else if (companySites.length === 1) {
            setSelectedSite(companySites[0]);
            setEstimateData((prev) => ({
              ...prev,
              customerCompanyId: selectedCompany.id,
              customerSiteId: companySites[0].id,
            }));
            addMessage(
              "assistant",
              `Great! I'll use the site: **${companySites[0].site_name}**\n${companySites[0].service_address}\n\nNow, what would you like to name this estimate? (e.g., "Annual HVAC Maintenance 2024")`
            );
            setConversationStep("estimate_name");
          } else {
            const siteList = companySites
              .map((s, i) => `${i + 1}. ${s.site_name} - ${s.service_address}`)
              .join("\n");
            addMessage(
              "assistant",
              `This company has ${companySites.length} service sites:\n\n${siteList}\n\nPlease type the number or name of the site.`
            );
            setConversationStep("site_select");
          }
        } else if (input === "no") {
          addMessage(
            "assistant",
            "No problem! Please tell me the company name you're looking for."
          );
          setConversationStep("company_search");
          setSelectedCompany(null);
          setCompanies([]);
        } else if (!isNaN(Number(input))) {
          // Number selection from list
          const index = Number(input) - 1;
          if (companies[index]) {
            const company = companies[index];
            setSelectedCompany(company);
            addMessage(
              "assistant",
              `You selected: **${company.business_name}**\n${
                company.industry ? `Industry: ${company.industry}\n` : ""
              }${
                company.phone_number ? `Phone: ${company.phone_number}\n` : ""
              }\nIs this correct? (Reply "yes" to confirm)`
            );
          } else {
            addMessage("assistant", "Invalid number. Please try again.");
          }
        } else {
          // Try to match by name
          const matchedCompany = companies.find(
            (c) => c.business_name.toLowerCase() === input
          );
          if (matchedCompany) {
            setSelectedCompany(matchedCompany);
            addMessage(
              "assistant",
              `You selected: **${matchedCompany.business_name}**\nIs this correct? (Reply "yes" to confirm)`
            );
          } else {
            addMessage(
              "assistant",
              "I couldn't find that company in the list. Please type the number or exact name."
            );
          }
        }
        break;
      }

      case "site_select": {
        const input = userInput.trim();
        const index = Number(input) - 1;

        let site: Site | undefined;
        if (!isNaN(index) && sites[index]) {
          site = sites[index];
        } else {
          site = sites.find((s) =>
            s.site_name.toLowerCase().includes(input.toLowerCase())
          );
        }

        if (site && selectedCompany) {
          setSelectedSite(site);
          setEstimateData((prev) => ({
            ...prev,
            customerCompanyId: selectedCompany.id,
            customerSiteId: site.id,
          }));
          addMessage(
            "assistant",
            `Perfect! I'll use: **${site.site_name}**\n${site.service_address}\n\nNow, what would you like to name this estimate? (e.g., "Annual HVAC Maintenance 2024")`
          );
          setConversationStep("estimate_name");
        } else {
          addMessage(
            "assistant",
            "I couldn't find that site. Please type the number from the list or try the site name."
          );
        }
        break;
      }

      case "estimate_name": {
        setEstimateData((prev) => ({
          ...prev,
          estimateName: userInput,
          estimateNumber: generateEstimateNumber(),
        }));
        addMessage(
          "assistant",
          `Great! Estimate name: **${userInput}**\n\nHow long should the contract be? (Enter number of months, e.g., 12 for one year)`
        );
        setConversationStep("contract_length");
        break;
      }

      case "contract_length": {
        const months = parseInt(userInput);
        if (isNaN(months) || months < 1) {
          addMessage(
            "assistant",
            "Please enter a valid number of months (e.g., 12, 24, 36)."
          );
        } else {
          setEstimateData((prev) => ({ ...prev, contractLength: months }));
          addMessage(
            "assistant",
            `Contract length: **${months} months**\n\nWhat date should the contract start? (Format: YYYY-MM-DD, e.g., 2024-01-01)`
          );
          setConversationStep("start_date");
        }
        break;
      }

      case "start_date": {
        // Simple date validation
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(userInput)) {
          setEstimateData((prev) => ({
            ...prev,
            contractStartDate: userInput,
          }));
          addMessage(
            "assistant",
            `Start date: **${userInput}**\n\nHow often should the customer be billed?\n1. Monthly\n2. Quarterly\n3. Bi-Annual\n4. Annual\n\nType the number or name.`
          );
          setConversationStep("billing_frequency");
        } else {
          addMessage(
            "assistant",
            "Please use the format YYYY-MM-DD (e.g., 2024-01-01)."
          );
        }
        break;
      }

      case "billing_frequency": {
        const input = userInput.toLowerCase().trim();
        let frequency = "";

        if (input === "1" || input.includes("month")) frequency = "Monthly";
        else if (input === "2" || input.includes("quarter"))
          frequency = "Quarterly";
        else if (input === "3" || input.includes("bi-annual"))
          frequency = "Bi-Annual";
        else if (
          input === "4" ||
          input.includes("annual") ||
          input.includes("year")
        )
          frequency = "Annual";

        if (frequency) {
          setEstimateData((prev) => ({ ...prev, billingFrequency: frequency }));
          addMessage(
            "assistant",
            `Billing frequency: **${frequency}**\n\nNow for travel information:\n\n1. How many miles to the site? (Enter 0 if not applicable)`
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

          // Show review
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
          // Create the estimate!
          try {
            const result = await base(
              "create",
              "maintenanceEstimate",
              estimateData
            );

            if (result.success) {
              addMessage(
                "assistant",
                `🎉 Success! Your maintenance estimate has been created!\n\n**Estimate Number:** ${estimateData.estimateNumber}\n\nThe estimate has been saved as a draft. You can view and edit it in the Maintenance Estimate Pro section.`
              );
              toast("✅ Estimate created successfully!");
              setConversationStep("complete");
            } else {
              addMessage(
                "assistant",
                `❌ Sorry, there was an error creating the estimate: ${result.error}\n\nPlease try again or contact support.`
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
  };

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 flex flex-col">
        <HeaderAndChatTab onClear={handleClear} />

        <div className="flex-1 border-r h-screen border-black/30 border-l overflow-y-auto px-4 py-4 space-y-4">
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

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          disabled={isProcessing}
        />
      </div>

      <EstimatePreview
        selectedCompany={selectedCompany}
        selectedSite={selectedSite}
        estimateData={estimateData}
        conversationStep={conversationStep}
      />
    </div>
  );
}
