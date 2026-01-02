"use client";

import { useState } from "react";
import { createRoot } from "react-dom/client";

// Confirm component
function ConfirmComponent({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [show, setShow] = useState(true);

  const handleConfirm = () => {
    setShow(false);
    onConfirm();
  };

  const handleCancel = () => {
    setShow(false);
    onCancel();
  };

  if (!show) return null;

  return (
    <>
      {/* Blur background */}
      <div
        className="fixed inset-0 bg-black/50  backdrop-blur-sm z-50 animate-fadeIn"
        onClick={handleCancel}
      />

      {/* Popup box */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-scaleIn">
        <div className="bg-white rounded-lg shadow-2xl p-6 min-w-[400px]">
          {/* Message */}
          <p className="text-lg text-gray-800 mb-6">{message}</p>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-charcoal rounded hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Main confirm function - works anywhere!
export function confirm(message: string, onConfirm: () => void) {
  // Create container if it doesn't exist
  let container = document.getElementById("confirm-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "confirm-container";
    document.body.appendChild(container);
  }

  // Create wrapper for this confirm
  const confirmWrapper = document.createElement("div");
  container.appendChild(confirmWrapper);

  // Render confirm
  const root = createRoot(confirmWrapper);
  const cleanup = () => {
    root.unmount();
    confirmWrapper.remove();
  };

  root.render(
    <ConfirmComponent
      message={message}
      onConfirm={() => {
        onConfirm();
        cleanup();
      }}
      onCancel={cleanup}
    />
  );
}

