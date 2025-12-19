import { Upload } from "lucide-react";
import { File } from "lucide-react";
export default function Database() {
  return (
    <main className=" ">
      <div className=" p-8 rounded-lg mx-auto border border-slate/30">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 m-2">
            <Upload className="text-slate" />
            <h1 className="text-2xl font-bold text-gray-900">
              Upload Task Database
            </h1>
          </div>
          <p className="text-lg text-gray-600 mx-2 text-md">
            Upload your Excel or CSV file containing maintenance tasks to
            populate the task library
          </p>
        </div>

        {/* Visual-only Upload Area (no external library) */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-black  py-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
          {/* Hidden file input (you can connect real upload logic later) */}
          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            className="hidden"
            id="task-upload"
            // onChange={(e) => handleFile(e)}  // Uncomment when adding real logic
          />

          {/* Click the whole area to trigger the hidden input */}
          <label htmlFor="task-upload" className="block cursor-pointer">
            {/* Large Document Icon */}
            <div className="mx-auto w-6 h-6 mb-10 text-gray-400">
              <File />
            </div>

            {/* Main Instruction */}
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Drop your file here, or{" "}
              <span className="text-blue-600 underline hover:text-blue-700">
                browse
              </span>
            </p>

            {/* Supported Formats */}
            <p className="text-base text-sm text-gray-500">
              Supports CSV, XLS, and XLSX files up to 10MB
            </p>
          </label>
        </div>
      </div>


   
        
        {/* File Format Requirements Section */}
        <div className="bg-white rounded-xl border my-4  border-slate/30 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">File Format Requirements</h2>

          <div className="space-y-8">
            {/* Required Columns */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Columns:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Descriptor</strong> - Task identifier (e.g., "AHU 0.75 01 SU")
                </li>
                <li>
                  <strong>Task</strong> - Task description (e.g., "AHU 0.75 Setup")
                </li>
                <li>
                  <strong>Hours</strong> - Time required (e.g., 0.1500)
                </li>
                <li>
                  <strong>Labor Type</strong> - "ST" for Straight Time or "OT" for Overtime
                </li>
                <li>
                  <strong>Equipment Type</strong> - Category (e.g., "Air Handler")
                </li>
                <li>
                  <strong>Bundle</strong> - Task bundle code (optional, see Bundle Codes below)
                </li>
              </ul>
            </div>

            {/* Bundle Codes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bundle Codes:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>S</strong> - Setup/Takedown</li>
                <li><strong>I</strong> - Inspection</li>
                <li><strong>A</strong> - Annual</li>
                <li><strong>F</strong> - Filter</li>
                <li><strong>B</strong> - Belt</li>
                <li><strong>FM</strong> - Full Maintenance</li>
                <li><strong>O</strong> - Operational</li>
              </ul>
            </div>

            {/* Size Columns */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size Columns (one per row):</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Tonnage</strong> - For tonnage-based equipment</li>
                <li><strong>HP</strong> - For horsepower-based equipment</li>
                <li><strong>BTU</strong> - For BTU-based equipment</li>
                <li><strong>LB</strong> - For pound-based equipment (ice machines)</li>
              </ul>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-10 p-5 bg-gray-100 rounded-lg flex items-start gap-3">
            <svg
              className="w-6 h-6 text-gray-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-800 font-medium">
              <strong>Important:</strong> Each row must have exactly one size column filled. The upload will clear existing task library data and replace it with your file.
            </p>
          </div>
        </div>
   
   
    </main>
  );
}
