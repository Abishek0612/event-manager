"use client";

import React from "react";
import { useEventStore } from "@/stores/event-store";
import { EventItem } from "./event-item";

export const EventList: React.FC = () => {
  const { filteredEvents, filters } = useEventStore();

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          {filters.search ||
          filters.category !== "all" ||
          filters.status !== "all" ||
          filters.priority !== "all" ? (
            <>
              <p className="text-lg font-medium text-gray-900">
                No events found
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your search or filter criteria
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-900">No events yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Add your first event using the form above
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Events ({filteredEvents.length})
        </h2>
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
