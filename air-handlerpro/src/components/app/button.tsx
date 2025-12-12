export default function Button({value}: {value: string}) {
    return (
         <button className="inline-flex h-fit items-center gap-1.5 bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xl hover:bg-gray-800 transition-all">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          New {value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()}
        </button>
    )
}