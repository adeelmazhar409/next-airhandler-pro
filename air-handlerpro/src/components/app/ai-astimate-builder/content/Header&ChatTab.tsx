import { ChatIcon, DeleteIcon, LeftArrowIcon } from "@/components/icons/icons";

export const HeaderAndChatTab = () => (
  <div>
    <div className="bg-white border border-silver px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-base font-semibold text-charcoal">
              AI Estimate Builder
            </h1>
            <p className="text-xs text-slate">
              Create and review your maintenance estimate
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-slate hover:text-cerulean transition-colors">
            <DeleteIcon />
            Clear Chat
          </button>
          <button className="flex items-center gap-1.5 text-xs text-slate hover:text-cerulean transition-colors">
            <LeftArrowIcon />
            Back to Estimates
          </button>
        </div>
      </div>
    </div>
    <div className="bg-white border-r border-l border-silver border-b px-4">
      <button className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-cerulean text-cerulean font-medium text-sm">
        <ChatIcon />
        Chat
      </button>
    </div>
  </div>
);
