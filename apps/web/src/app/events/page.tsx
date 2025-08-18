"use client";

import React, { useEffect } from "react";
import { useEventStore } from "@/stores/event-store";
import { EventForm } from "@/components/events/event-form";
import { EventSearch } from "@/components/events/event-search";
import { EventList } from "@/components/events/event-list";
import { EventStats } from "@/components/events/event-stats";
import { EventActions } from "@/components/events/event-actions";
import { Toaster } from "react-hot-toast";

export default function EventsPage() {
  const loadEvents = useEventStore((state) => state.loadEvents);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Event Manager</h1>
            <p className="mt-2 text-lg text-gray-600">
              Organize and manage your events with powerful features
            </p>
          </div>

          {/* Statistics */}
          <div className="mb-8">
            <EventStats />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <EventForm />
            </div>

            {/* Events Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filters */}
              <EventSearch />

              {/* Actions */}
              <EventActions />

              {/* Events List */}
              <EventList />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
