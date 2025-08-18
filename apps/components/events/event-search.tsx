"use client";

import React from "react";
import { useEventStore } from "@/stores/event-store";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

export const EventSearch: React.FC = () => {
  const { filters, setFilters } = useEventStore();

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search events by name or description..."
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
      />

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value as any })}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="meeting">Meeting</option>
          <option value="other">Other</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as any })}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Today</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as any })}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-");
            setFilters({ sortBy: sortBy as any, sortOrder: sortOrder as any });
          }}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="date-asc">Date (Earliest)</option>
          <option value="date-desc">Date (Latest)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="priority-desc">Priority (High-Low)</option>
          <option value="created-desc">Recently Added</option>
        </select>
      </div>
    </div>
  );
};
