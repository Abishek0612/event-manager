"use client";

import React from "react";
import { useEventStore } from "@/stores/event-store";
import { EventItem } from "./event-item";
import { motion, AnimatePresence } from "framer-motion";

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

      <AnimatePresence>
        <div className="space-y-3">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <EventItem event={event} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};
