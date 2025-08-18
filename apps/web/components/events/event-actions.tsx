"use client";

import React, { useRef } from "react";
import { useEventStore } from "@/stores/event-store";
import { Button } from "@/components/ui/button";
import {
  exportToCSV,
  exportToJSON,
  exportToExcel,
  exportToTXT,
  importFromJSON,
} from "@/lib/export";
import {
  Download,
  Trash2,
  BarChart3,
  Grid3X3,
  Upload,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

export const EventActions: React.FC = () => {
  const { filteredEvents, clearAllEvents, stats, addEvent } = useEventStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportCSV = () => {
    if (filteredEvents.length === 0) {
      alert("No events to export");
      return;
    }
    exportToCSV(filteredEvents, "event-manager-export");
  };

  const handleExportJSON = () => {
    if (filteredEvents.length === 0) {
      alert("No events to export");
      return;
    }
    exportToJSON(filteredEvents, "event-manager-export");
  };

  const handleExportExcel = () => {
    if (filteredEvents.length === 0) {
      alert("No events to export");
      return;
    }
    exportToExcel(filteredEvents, "event-manager-export");
  };

  const handleExportTXT = () => {
    if (filteredEvents.length === 0) {
      alert("No events to export");
      return;
    }
    exportToTXT(filteredEvents, "event-manager-export");
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const events = await importFromJSON(file);
      events.forEach((event) => addEvent(event));
      alert(`Successfully imported ${events.length} events!`);
    } catch (error) {
      alert("Failed to import events. Please check the file format.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all events? This action cannot be undone."
      )
    ) {
      clearAllEvents();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-4 rounded-lg border">
      <div className="flex flex-wrap gap-2">
        {/* Export Dropdown */}
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            disabled={filteredEvents.length === 0}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
            <span className="ml-1">▼</span>
          </Button>

          <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10 min-w-40">
            <button
              onClick={handleExportCSV}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              CSV
            </button>
            <button
              onClick={handleExportExcel}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
              Excel
            </button>
            <button
              onClick={handleExportJSON}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              JSON
            </button>
            <button
              onClick={handleExportTXT}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Text
            </button>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={handleImport}>
          <Upload className="h-4 w-4 mr-1" />
          Import JSON
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={handleClearAll}
          disabled={filteredEvents.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Grid3X3 className="h-4 w-4" />
          Total: {stats.total}
        </span>
        <span>Showing: {filteredEvents.length}</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />
    </div>
  );
};
