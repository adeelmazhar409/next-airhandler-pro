import { PlusIcon } from "../../icons/icons";

interface ButtonProps {
  value: string;
  onClick?: () => void;
}

export default function Button({ value, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-fit items-center gap-1.5 bg-cerulean text-white px-4 py-2 rounded-normal text-xs font-semibold shadow-xl hover:bg-slate hover:cursor-pointer transition-colors"
    >
      <PlusIcon />
      {value}
    </button>
  );
}
