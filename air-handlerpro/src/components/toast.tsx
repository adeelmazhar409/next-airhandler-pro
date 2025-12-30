"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// Toast component
function ToastComponent({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  // Detect color from message
  const getColor = () => {
    const m = message.toLowerCase();
    if (m.includes("success") || m.includes("✅"))
      return "bg-green-100 border-green-400 text-green-800";
    if (m.includes("error") || m.includes("❌"))
      return "bg-red-100 border-red-400 text-red-800";
    if (m.includes("warning") || m.includes("⚠"))
      return "bg-yellow-100 border-yellow-400 text-yellow-800";
    return "bg-blue-100 border-blue-400 text-blue-800";
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fadeIn">
      <div className={`px-6 py-3 rounded-lg border-2 shadow-lg ${getColor()}`}>
        {message}
      </div>
    </div>
  );
}

// Main toast function - works anywhere!
export function toast(message: string) {
  // Create container if it doesn't exist
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  // Create wrapper for this toast
  const toastWrapper = document.createElement("div");
  container.appendChild(toastWrapper);

  // Render toast
  const root = createRoot(toastWrapper);
  root.render(
    <ToastComponent
      message={message}
      onClose={() => {
        root.unmount();
        toastWrapper.remove();
      }}
    />
  );
}

// CSS for animation (add to globals.css)
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
*/
