import { Upload, FileText, Trash2 } from "lucide-react";

export default function Sheets() {
  return (
    <div className="p-8">
      {/* Upload Section */}
      <div className="bg-white border border-slate/30 rounded-lg p-8 mb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-charcoal mb-2 flex items-center gap-2">
            <Upload className="w-6 h-6" />
            Upload Task Sheets
          </h1>
          <p className="text-sm text-slate">
            Upload PDF task sheets for specific equipment types
          </p>
        </div>

        {/* Equipment Type Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Equipment Type
          </label>
          <select className="appearance-none w-full rounded-lg pl-4 pr-10 py-3 border border-silver text-[15px] text-charcoal bg-white">
            <option>Select equipment type</option>
          </select>
        </div>

        {/* File Upload Area */}
        <div className="border-2 border-dashed border-slate/30 rounded-lg p-12 text-center bg-gray-50">
          <div className="flex flex-col items-center gap-4">
            {/* File Icon */}
            <FileText className="w-16 h-16 text-slate" />

            {/* Text */}
            <div>
              <p className="text-charcoal text-lg mb-1">
                Drop your PDF here, or{" "}
                <span className="text-cerulean hover:underline cursor-pointer font-medium">
                  browse
                </span>
              </p>
              <p className="text-sm text-slate">PDF files only, up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Files Section */}
      <div className="bg-white border border-slate/30 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-charcoal mb-6">
          Uploaded Task Sheets
        </h2>

        <div className="flex items-center justify-between p-4 border border-silver rounded-lg">
          <div className="flex items-center gap-4">
            {/* File Icon */}
            <FileText className="w-6 h-6 text-slate" />

            {/* File Info */}
            <div>
              <p className="text-charcoal font-medium">
                wh-series-data-sheet-pet.pdf
              </p>
              <p className="text-sm text-slate">
                Air Handler • 3.53 MB • 8/8/2025
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button className="p-2 text-slate hover:text-red-600 hover:bg-platinum rounded transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
