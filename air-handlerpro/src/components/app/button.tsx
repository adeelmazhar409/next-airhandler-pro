import { PlusIcon } from "../icons/icons";

export default function Button({ value }: { value: string }) {
  return (
    <button className="inline-flex h-fit items-center gap-1.5 bg-cerulean text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xl hover:bg-slate hover:cursor-pointer transition-colors">
      <PlusIcon />
      New {value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()}
    </button>
  );
}
