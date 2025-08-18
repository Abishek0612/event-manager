"use client";

import React from "react";
import { useEventStore } from "@/stores/event-store";
import { Button } from "@/components/ui/button";
import { exportToCSV, exportToJSON } from "@/lib/export";
import { Download, Trash2, BarChart3, Grid3X3 } from "lucide-react";

export const EventActions: React.FC = () => {
  const { filteredEvents, clearAllEvents, stats } = useEventStore();

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
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={filteredEvents.length === 0}
        >
          <Download className="h-4 w-4 mr-1" />
          Export CSV
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJSON}
          disabled={filteredEvents.length === 0}
        >
          <Download className="h-4 w-4 mr-1" />
          Export JSON
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
    </div>
  );
};
