"use client";

import { useState } from "react";
import { toast } from "@/components/toast";
import { confirm } from "@/components/confirm";

export default function TestPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Work Order #001" },
    { id: 2, name: "Work Order #002" },
    { id: 3, name: "Work Order #003" },
  ]);

  const [loading, setLoading] = useState(false);

  // Test different toast types
  const testSuccess = () => {
    toast("✅ Success! Record saved");
  };

  const testError = () => {
    toast("❌ Error: Failed to save");
  };

  const testWarning = () => {
    toast("⚠ Warning: Check your input");
  };

  const testInfo = () => {
    toast("Loading your data...");
  };

  // Test with simulated API
  const testApiCall = async () => {
    setLoading(true);
    toast("Saving changes...");

    setTimeout(() => {
      setLoading(false);
      toast("✅ Changes saved successfully");
    }, 2000);
  };

  // Test delete with confirmation
  const handleDelete = (id: number, name: string) => {
    confirm(`Are you sure you want to delete "${name}"?`, () => {
      // This runs only if user clicks "Delete"
      setItems(items.filter((item) => item.id !== id));
      toast("✅ Deleted successfully!");
    });
  };

  // Real-world example
  const handleBulkDelete = () => {
    confirm(`Delete all ${items.length} items?`, () => {
      setItems([]);
      toast("✅ All items deleted");
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-charcoal">
      <h1 className="text-4xl font-bold mb-2 text-charcoal">🧪 Toast & Confirm Test</h1>
      <p className="text-gray-600 mb-8">Works anywhere - NO layout needed!</p>

      {/* TOAST TESTS */}
      <section className="mb-12 border-2 border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🍞 Toast Notifications</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={testSuccess}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
          >
            ✅ Show Success
          </button>

          <button
            onClick={testError}
            className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
          >
            ❌ Show Error
          </button>

          <button
            onClick={testWarning}
            className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium"
          >
            ⚠️ Show Warning
          </button>

          <button
            onClick={testInfo}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            ℹ️ Show Info
          </button>

          <button
            onClick={testApiCall}
            disabled={loading}
            className="col-span-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium disabled:opacity-50"
          >
            🚀 Test API Call (with loading)
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="font-bold text-blue-900 mb-2">Usage:</p>
          <pre className="text-sm text-blue-800">
            {`import { toast } from "@/components/Toast";

toast("✅ Success!");
toast("❌ Error!");
toast("⚠ Warning!");
toast("Loading...");`}
          </pre>
        </div>
      </section>

      {/* CONFIRM TESTS */}
      <section className="text-charoal mb-12 border-2 border-gray-300 rounded-lg p-6" >
        <h2 className="text-2xl font-bold mb-4">🗑️ Confirm Popup</h2>

        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="font-medium text-gray-800">{item.name}</span>
              <button
                onClick={() => handleDelete(item.id, item.name)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No items left. Refresh page to reset.
            </div>
          )}

          {items.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Delete All ({items.length})
            </button>
          )}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="font-bold text-red-900 mb-2">Usage:</p>
          <pre className="text-sm text-red-800">
            {`import { confirm } from "@/components/Confirm";

confirm("Delete this?", () => {
  // Runs if user clicks "Delete"
  deleteItem(id);
  toast("✅ Deleted!");
});`}
          </pre>
        </div>
      </section>

      {/* REAL EXAMPLE */}
      <section className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          💼 Real-World Example
        </h2>

        <pre className="bg-white p-4 rounded-lg border border-green-300 text-sm overflow-x-auto">
          {`import { toast } from "@/components/Toast";
import { confirm } from "@/components/Confirm";

const handleDelete = async (id: string) => {
  confirm("Are you sure you want to delete?", async () => {
    toast("Deleting...");
    
    try {
      await api.delete(id);
      toast("✅ Deleted successfully!");
    } catch (error) {
      toast("❌ Error: " + error.message);
    }
  });
};

const handleSave = async () => {
  toast("Saving...");
  
  try {
    await api.save(data);
    toast("✅ Saved successfully!");
  } catch (error) {
    toast("❌ Error: " + error.message);
  }
};`}
        </pre>
      </section>

      {/* SETUP */}
      <section className="mt-12 border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          ⚙️ Setup (2 Steps!)
        </h2>

        <div className="space-y-4">
          <div>
            <p className="font-bold text-blue-900 mb-2">
              Step 1: Add Components
            </p>
            <ul className="list-disc ml-6 text-blue-800">
              <li>Toast.tsx → src/components/Toast.tsx</li>
              <li>Confirm.tsx → src/components/Confirm.tsx</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-blue-900 mb-2">
              Step 2: Add CSS to globals.css
            </p>
            <pre className="bg-white p-3 rounded border border-blue-300 text-xs">
              {`@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
.animate-fadeIn { animation: fadeIn 0.2s ease-out; }
.animate-scaleIn { animation: scaleIn 0.2s ease-out; }`}
            </pre>
          </div>

          <div className="bg-green-100 border border-green-400 rounded p-3">
            <p className="font-bold text-green-900">✅ That's it!</p>
            <p className="text-green-800 text-sm">
              No need to add anything to layout. Just import and use!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
