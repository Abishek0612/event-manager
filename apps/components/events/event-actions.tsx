"use client";

import React, { useState } from "react";
import { useEventStore } from "@/stores/event-store";
import { Button } from "@/components/ui/button";
import { exportToExcel, exportToCSV } from "@/utils/export";
import {
  DocumentArrowDownIcon,
  TrashIcon,
  ChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export const EventActions: React.FC = () => {
  const { filteredEvents, clearAllEvents, stats } = useEventStore();
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const handleExportExcel = () => {
    if (filteredEvents.length === 0) {
      toast.error("No events to export");
      return;
    }

    exportToExcel(filteredEvents, "event-manager-export");
    toast.success(`Exported ${filteredEvents.length} events to Excel`);
  };

  const handleExportCSV = () => {
    if (filteredEvents.length === 0) {
      toast.error("No events to export");
      return;
    }

    exportToCSV(filteredEvents, "event-manager-export");
    toast.success(`Exported ${filteredEvents.length} events to CSV`);
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all events? This action cannot be undone."
      )
    ) {
      clearAllEvents();
      toast.success("All events cleared");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportExcel}
          disabled={filteredEvents.length === 0}
        >
          <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
          Export Excel
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={filteredEvents.length === 0}
        >
          <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
          Export CSV
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={handleClearAll}
          disabled={filteredEvents.length === 0}
        >
          <TrashIcon className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Squares2X2Icon className="h-4 w-4" />
          Total: {stats.total}
        </span>
        <span>Showing: {filteredEvents.length}</span>
      </div>
    </div>
  );
};
