import React, { useState } from "react";
import DealsTable from "../../UI-components/table";
import { Deal } from "../../UI-components/table";
import { Calendar, ContactIcon } from "lucide-react";
import Button from "../../UI-components/button";
import { DealForm } from "./forms/DealForm";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const stages = [
  { name: "Lead", color: "bg-orange-300", textColor: "text-orange-300" },
  { name: "Qualified", color: "bg-cerulean", textColor: "text-cerulean" },
  { name: "Proposal", color: "bg-black", textColor: "text-black" },
  { name: "Negotiation", color: "bg-purple-500", textColor: "text-purple-500" },
  { name: "Closed Won", color: "bg-green-500", textColor: "text-green-500" },
  { name: "Closed Lost", color: "bg-red-500", textColor: "text-red-500" },
];

interface PipelineContentProps {
  onDealClick?: (deal: Deal) => void;
}

// Draggable Deal Card Component
function DraggableDealCard({
  deal,
  stage,
  onDealClick,
}: {
  deal: Deal;
  stage: (typeof stages)[0];
  onDealClick?: (deal: Deal) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: deal.id,
      data: { deal },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        // Only trigger click if not dragging
        if (!isDragging && onDealClick) {
          onDealClick(deal);
        }
      }}
      className={`bg-white p-3 rounded-lg border border-silver shadow-sm hover:shadow-md hover:border-cerulean transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4 className="font-semibold text-charcoal mb-1 text-sm">
        {deal.dealName}
      </h4>
      <p className={`text-base font-bold ${stage.textColor}`}>
        ${deal.amount.toLocaleString()}
      </p>
      <div className="flex justify-between mt-2">
        <p className="text-black text-xs">Probability</p>
        <p className="text-black text-xs my-auto">{deal.barPercentage}%</p>
      </div>
      <div className="w-full bg-gray-300 my-1 rounded-full h-1 overflow-hidden">
        <div
          className={` ${stage.color} h-full   rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${deal.barPercentage}%` }}
        />
      </div>
      <div className="flex items-center gap-1  w-full my-3">
        <Calendar className="text-slate h-4" />
        <p className="text-slate text-sm">Close Date: {deal.closingDate}</p>
      </div>

      <div
        className={`flex items-center gap-1 ${
          deal.owner ? "block" : "hidden"
        }`}
      >
        <ContactIcon className="text-slate h-4" />
        <p className="text-slate text-sm">Owner</p>
      </div>
    </div>
  );
}

// Droppable Column Component
function DroppableColumn({
  stage,
  deals,
  onDealClick,
}: {
  stage: (typeof stages)[0];
  deals: Deal[];
  onDealClick?: (deal: Deal) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.name,
  });

  return (
    <div className="w-60 shrink-0 rounded-lg border-2 border-silver flex flex-col max-h-[calc(100vh-250px)]">
      {/* Column Header */}
      <div className="p-3 border-b-2 border-silver bg-white rounded-t-lg flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
          <span className="font-semibold text-charcoal text-sm">
            {stage.name}
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-platinum flex items-center justify-center text-xs font-bold text-charcoal">
          {deals.length}
        </div>
      </div>

      {/* Cards - Droppable Area with Scroll */}
      <div
        ref={setNodeRef}
        className={`p-2 space-y-2 min-h-60 flex-1 overflow-y-auto transition-colors scrollbar-thin scrollbar-thumb-slate/30 scrollbar-track-transparent hover:scrollbar-thumb-slate/50 ${
          isOver ? "bg-cerulean/10" : ""
        }`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(100 116 139 / 0.3) transparent",
        }}
      >
        {deals.length === 0 ? (
          <p className="text-center text-slate text-sm py-8">
            No deals in this stage
          </p>
        ) : (
          deals.map((deal) => (
            <DraggableDealCard
              key={deal.id}
              deal={deal}
              stage={stage}
              onDealClick={onDealClick}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function PipelineContent({ onDealClick }: PipelineContentProps) {
  const [view, setView] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [formToggle, setFormToggle] = useState(false);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  // Sample data - replace with real data later
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "25-10035",
      accountName: "Brand New Site Testing",
      dealName: "Test Estimate1",
      amount: 4680,
      stage: "Proposal",
      closingDate: "2025-12-06",
      serviceSite: "Brand New Site Testing",
      createdBy: "Tim Wallick",
      createdTime: "2025-11-05",
      barPercentage: 50,
      owner: true,
    },
    {
      id: "1",
      accountName: "Acme Corp",
      dealName: "Enterprise Software License Renewal",
      amount: 75000,
      stage: "Qualified",
      closingDate: "2025-01-20",
      serviceSite: "Main Headquarters - New York",
      createdBy: "Tim Wallick",
      createdTime: "2024-11-15",
      barPercentage: 50,
      owner: true,
    },
    {
      id: "2",
      accountName: "Vertex Solutions",
      dealName: "Cloud Migration & Infrastructure Upgrade",
      amount: 148500,
      stage: "Negotiation",
      closingDate: "2025-02-28",
      serviceSite: "Data Center East - Virginia",
      createdBy: "Sarah Chen",
      createdTime: "2024-10-22",
      barPercentage: 85,
    },
    {
      id: "3",
      accountName: "Nexlify Technologies",
      dealName: "Custom CRM Integration",
      amount: 92000,
      stage: "Lead",
      closingDate: "2025-03-10",
      serviceSite: "Regional Office - Chicago",
      createdBy: "Michael Torres",
      createdTime: "2024-12-05",
      barPercentage: 20,
    },
    {
      id: "4",
      accountName: "Pinnacle Health Systems",
      dealName: "Patient Portal Modernization",
      amount: 210000,
      stage: "Negotiation",
      closingDate: "2025-01-31",
      serviceSite: "Central Hospital Campus",
      createdBy: "Tim Wallick",
      createdTime: "2024-09-18",
      barPercentage: 95,
    },
    {
      id: "5",
      accountName: "Summit Retail Group",
      dealName: "POS System Rollout (Phase 2)",
      amount: 63500,
      stage: "Negotiation",
      closingDate: "2025-04-05",
      serviceSite: "Distribution Center - Atlanta",
      createdBy: "Emma Rodriguez",
      createdTime: "2024-11-28",
      barPercentage: 70,
    },
    {
      id: "6",
      accountName: "Horizon Manufacturing",
      dealName: "Factory Automation Upgrade",
      amount: 189000,
      stage: "Closed Lost",
      closingDate: "2025-02-15",
      serviceSite: "Plant #3 - Detroit",
      createdBy: "Tim Wallick",
      createdTime: "2024-08-10",
      barPercentage: 100,
    },
    // Additional deals to demonstrate scrolling
    {
      id: "7",
      accountName: "TechStart Inc",
      dealName: "HVAC System Installation",
      amount: 125000,
      stage: "Proposal",
      closingDate: "2025-02-20",
      serviceSite: "Silicon Valley Campus",
      createdBy: "John Smith",
      createdTime: "2024-12-01",
      barPercentage: 60,
    },
    {
      id: "8",
      accountName: "Global Enterprises",
      dealName: "Annual Maintenance Contract",
      amount: 85000,
      stage: "Proposal",
      closingDate: "2025-03-15",
      serviceSite: "Downtown Office Complex",
      createdBy: "Sarah Chen",
      createdTime: "2024-12-10",
      barPercentage: 45,
    },
    {
      id: "9",
      accountName: "Retail Solutions Co",
      dealName: "Multi-Site HVAC Upgrade",
      amount: 320000,
      stage: "Qualified",
      closingDate: "2025-04-01",
      serviceSite: "Regional Distribution Center",
      createdBy: "Michael Torres",
      createdTime: "2024-11-20",
      barPercentage: 40,
    },
    {
      id: "10",
      accountName: "Healthcare Plus",
      dealName: "Emergency Cooling System",
      amount: 95000,
      stage: "Lead",
      closingDate: "2025-01-25",
      serviceSite: "Medical Center East",
      createdBy: "Emma Rodriguez",
      createdTime: "2024-12-15",
      barPercentage: 15,
    },
  ]);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    })
  );

  const handleCreateEstimate = () => {
    setFormToggle(true);
  };

  const handleCancel = () => {
    setFormToggle(false);
  };

  const handleSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const deal = deals.find((d) => d.id === active.id);
    setActiveDeal(deal || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveDeal(null);

    if (!over) return;

    const dealId = active.id as string;
    const newStage = over.id as string;

    // Update deal stage
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );

    // TODO: Here you would typically make an API call to persist the change
    console.log(`Deal ${dealId} moved to ${newStage}`);
  };

  const handleDealClick = (deal: Deal) => {
    if (onDealClick) {
      onDealClick(deal);
    }
  };

  const handleNewDeal = () => {
    console.log("New deal clicked");
  };

  if (formToggle) {
    return <DealForm onCancel={handleCancel} onSubmit={handleSubmit} />;
  }

  return (
    <div className="">
      <div className="max-w-full mx-auto">
        {/* View Toggle Buttons */}
        <div className="flex gap-2 mb-4 justify-between items-center">
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setView("cards")}
              className={`flex items-center gap-1 px-3 py-1.5 border font-medium transition-colors rounded-md ${
                view === "cards"
                  ? "bg-cerulean text-white border-cerulean"
                  : "bg-white text-charcoal border-silver hover:bg-platinum"
              }`}
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Cards
            </button>

            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-1 px-3 py-1.5 border font-medium transition-colors rounded-md ${
                view === "table"
                  ? "bg-cerulean text-white border-cerulean"
                  : "bg-white text-charcoal border-silver hover:bg-platinum"
              }`}
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
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Table
            </button>
          </div>
          <Button onClick={handleCreateEstimate} value="New Deal" />
        </div>

        {/* Cards View (Kanban with DnD) */}
        {view === "cards" && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-3 overflow-x-auto p-1">
              {stages.map((stage) => {
                const stageDeals = deals.filter(
                  (deal) => deal.stage === stage.name
                );
                return (
                  <DroppableColumn
                    key={stage.name}
                    stage={stage}
                    deals={stageDeals}
                    onDealClick={handleDealClick}
                  />
                );
              })}
            </div>

            {/* Drag Overlay - shows what you're dragging */}
            <DragOverlay>
              {activeDeal ? (
                <div className="bg-white p-3 rounded-lg border-2 border-cerulean shadow-lg rotate-3 opacity-90">
                  <h4 className="font-semibold text-charcoal mb-1 text-sm">
                    {activeDeal.dealName}
                  </h4>
                  <p className="text-base font-bold text-cerulean">
                    ${activeDeal.amount.toLocaleString()}
                  </p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}

        {/* Table View - No DnD */}
        {view === "table" && (
          <DealsTable
            deals={deals}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onDealClick={handleDealClick}
            showNewDealButton={true}
            onNewDeal={handleNewDeal}
          />
        )}
      </div>
    </div>
  );
}