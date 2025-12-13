import { PlusIcon } from "../icons/icons";

export default function Button({ value }: { value: string }) {
  return (
    <button className="inline-flex h-fit items-center gap-1.5 bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xl hover:bg-gray-800 hover:cursor-pointer">
      <PlusIcon />
      New {value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()}
    </button>
  );
}
