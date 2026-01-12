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
import { EstimateSummaryTable } from "./content/EstimateSummaryTable";
import { add } from "@dnd-kit/utilities";
import { boolean } from "zod";

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
  | "company&site_search"
  | "company&site_confirm"
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
  const [showSummary, setShowSummary] = useState(false);
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

  // Generate estimate number helper
  const generateEstimateNumber = () => {
    return `EST-${Date.now()}`;
  };

  // Save estimate to database
  const handleSaveEstimate = async () => {
    try {
      if (!selectedCompany || !selectedSite) {
        toast("❌ Please select a company and site first");
        return;
      }

      const completeEstimateData = {
        customer_company_id: selectedCompany.id,
        customer_site_id: selectedSite.id,
        estimate_name: estimateData.estimateName || "Untitled Estimate",
        estimate_number:
          estimateData.estimateNumber || generateEstimateNumber(),
        contract_length: estimateData.contractLength || 12,
        contract_start_date:
          estimateData.contractStartDate ||
          new Date().toISOString().split("T")[0],
        billing_frequency: estimateData.billingFrequency || "Monthly",
        miles_to_site: estimateData.milesToSite || 0,
        travel_charge: estimateData.travelCharge || 0,
        parking_fees: estimateData.parkingFees || 0,
        status: estimateData.status || "Draft",
        total_amount: estimateData.totalAmount || 0,
      };

      const result = await base(
        "create",
        "maintenanceEstimate",
        completeEstimateData
      );

      if (result.success) {
        toast("✅ Estimate saved successfully!");
        addMessage(
          "assistant",
          `Great! Your estimate has been saved successfully.\n\nEstimate Number: **${completeEstimateData.estimate_number}**\n\nWould you like to create another estimate?`
        );
        setConversationStep("complete");
      } else {
        toast(
          "❌ Failed to save estimate: " + (result.error || "Unknown error")
        );
      }
    } catch (error: any) {
      console.error("Error saving estimate:", error);
      toast("❌ Error saving estimate: " + error.message);
    }
  };

  
  const processUserInput = async (userInput: string) => {
    setIsProcessing(true);

    switch (conversationStep) {
      case "initial":
      case "company&site_search": {
        // Search for companies
        const company = await base("fetch", "company");
        const sites = await base("fetch", "site");

        const result = [company, sites];
        
      
        if (result[0].success && result[1].success && result[0].data && result[1].data) {
          const matchedCompanies = result[0].data.filter((company: Company) =>
            company.business_name
              .toLowerCase()
              .includes(userInput.toLowerCase())
          );

          const matchedSites = result[1].data.filter((site: Site) =>
            site.site_name.toLowerCase().includes(userInput.toLowerCase())
          );

          if (matchedCompanies.length === 0 && matchedSites.length === 0) {
            addMessage(
              "assistant",
              `I couldn't find any companies or sites matching "${userInput}". Please try again with a different company or site name.`
            );
          } else if (matchedCompanies.length === 1 || matchedSites.length === 1) {
            setSelectedCompany(matchedCompanies[0]);
            setSelectedSite(matchedSites[0]);
            setSites(matchedSites);
            setCompanies(matchedCompanies);

            if (matchedCompanies.length === 1) {

              addMessage(
                "assistant",
                `Great! I found: **${matchedCompanies[0].business_name}**\n\nIs this the correct company? (Reply "yes" or "no")`
              );
              setConversationStep("company&site_confirm");
          
            } else {
              addMessage(
                "assistant",
                `Great! I found: **${matchedSites[0].site_name}**\n\nIs this the correct site? (Reply "yes" or "no")`
              );
              setConversationStep("company&site_confirm");
            }
          
          
          }
          
          
          else {
           
            setCompanies(matchedCompanies);
            const companyList = matchedCompanies
              .map((c: Company, i: number) => `${i + 1}. ${c.business_name}`)
              .join("\n");
            addMessage(
              "assistant",
              `I found multiple companies:\n\n${companyList}\n\nPlease reply with the number of the company you want.`
            );
            setConversationStep("company&site_confirm");
          }
        } else {
          addMessage(
            "assistant",
            "Sorry, I couldn't fetch companies at this time. Please try again."
          );
        }
        break;
      }

      case "company&site_confirm": {
        const input = userInput.toLowerCase().trim();
       const  selectedCompany = companies[0];
        const selectedSite = sites[0];




        if (input === "yes") {

          if (selectedCompany) {
            addMessage(
              "assistant",
              `Excellent! You've selected: **${
                selectedCompany.business_name
              }**\n\nWhat would you like to name this estimate?`
            );
            setConversationStep("estimate_name");


          } else if (selectedSite) { 
   addMessage(
     "assistant",
     `Excellent! You've selected: **${
       selectedSite.site_name
     }**\n\nWhat would you like to name this estimate?`
   );
   setConversationStep("estimate_name");
            
          }
          // Fetch sites for the company
          // const result = await base("fetch", "site");
          // if (result.success && result.data) {
          //   const companySites = result.data.filter(
          //     (site: any) => site.parent_company_id === selectedCompany.id
          //   );

       
        
          //   if (companySites.length === 0) {
          //     addMessage(
          //       "assistant",
          //       "This company has no service sites. Please add sites first."
          //     );
          //     setConversationStep("initial");
          //   } else {
          //     setSites(companySites);
          //     const siteList = companySites
          //       .map((s: Site, i: number) => `${i + 1}. ${s.site_name}`)
          //       .join("\n");
          //     addMessage(
          //       "assistant",
          //       `Perfect! Please select a site:\n\n${siteList}\n\nReply with the site number.`
          //     );
          //     setConversationStep("site_select");
          //   }
          // }
        } else if (input === "no") {
          addMessage(
            "assistant",
            "No problem! What company would you like to create an estimate for?"
          );
          setConversationStep("company&site_search");
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

      // case "site_select": {
      //   const siteIndex = parseInt(userInput) - 1;
      //   if (!isNaN(siteIndex) && siteIndex >= 0 && siteIndex < sites.length) {
      //     setSelectedSite(sites[siteIndex]);
      //     setEstimateData((prev) => ({
      //       ...prev,
      //       customerCompanyId: selectedCompany?.id,
      //       customerSiteId: sites[siteIndex].id,
      //     }));
      //     addMessage(
      //       "assistant",
      //       `Perfect! Site selected: **${sites[siteIndex].site_name}**\n\nNow, what would you like to name this estimate?`
      //     );
      //     setConversationStep("estimate_name");
      //   } else {
      //     addMessage("assistant", "Invalid site number. Please try again.");
      //   }
      //   break;
      // }

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
        const parts = userInput.split(",").map((s) => s.trim());
        if (parts.length !== 3) {
          addMessage(
            "assistant",
            "Please provide all three values separated by commas: miles, travel charge, parking fees (e.g., 25, 50, 10)"
          );
        } else {
          const miles = parseFloat(parts[0]);
          const travelCharge = parseFloat(parts[1]);
          const parkingFees = parseFloat(parts[2]);

          if (isNaN(miles) || isNaN(travelCharge) || isNaN(parkingFees)) {
            addMessage(
              "assistant",
              "Please make sure all values are valid numbers."
            );
          } else {
            setEstimateData((prev) => ({
              ...prev,
              milesToSite: miles,
              travelCharge: travelCharge,
              parkingFees: parkingFees,
              status: "Draft",
              totalAmount: travelCharge + parkingFees,
            }));
            addMessage(
              "assistant",
              `Perfect! I've collected all the information.\n\n**Miles to Site:** ${miles}\n**Travel Charge:** $${travelCharge}\n**Parking Fees:** $${parkingFees}\n\nYour estimate is ready! Check the summary table below to review and edit any details. When you're satisfied, click "Save Estimate" to save it to the database.`
            );
            setConversationStep("review");
            setShowSummary(true);
          }
        }
        break;
      }
      case "review": {
        const input = userInput.toLowerCase().trim();
        if (input.includes("save")) {
          await handleSaveEstimate();
        } else {
          addMessage(
            "assistant",
            'Please review the estimate summary table below. You can edit any field by clicking on it. When ready, type "save" or click the "Save Estimate" button.'
          );
        }
        break;
      }
      case "complete": {
        addMessage(
          "assistant",
          "Would you like to create another estimate? If so, tell me the company name!"
        );
        setConversationStep("company&site_search");
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

  const handleUpdateEstimate = (updatedData: Partial<EstimateData>) => {
    setEstimateData(updatedData);
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
    setShowSummary(false);
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
    <div className="flex h-[650px]  bg-gray-50">
      {/* Left Side - Chat (takes remaining space) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed */}
        <HeaderAndChatTab onClear={handleClear} onBack={onNavigateBack} />

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}

           {showSummary && conversationStep === "review" && (
    <div className="my-4">
      <EstimateSummaryTable
        data={estimateData}
        companyName={selectedCompany?.business_name}
        siteName={selectedSite?.site_name}
        onUpdate={handleUpdateEstimate}
        onSave={handleSaveEstimate}
      />
    </div>
  )}
  
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
