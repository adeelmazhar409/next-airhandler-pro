import { ChatIcon, DeleteIcon, LeftArrowIcon } from "@/components/icons/icons";

interface HeaderAndChatTabProps {
  onClear?: () => void;
  onBack?: () => void;
}

export const HeaderAndChatTab = ({
  onClear,
  onBack,
}: HeaderAndChatTabProps) => (
  <div>
    <div className="bg-white border-b border-silver px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-base font-semibold text-charcoal">
              AI Estimate Builder
            </h1>
            <p className="text-xs text-slate">
              Create maintenance estimates with AI assistance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onClear && (
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs text-slate hover:text-cerulean transition-colors"
            >
              <DeleteIcon />
              Clear Chat
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs text-slate hover:text-cerulean transition-colors"
            >
              <LeftArrowIcon />
              Back to Estimates
            </button>
          )}
        </div>
      </div>
    </div>
    <div className="bg-white border-b border-silver px-4">
      <button className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-cerulean text-cerulean font-medium text-sm">
        <ChatIcon />
        Chat
      </button>
    </div>
  </div>
);
