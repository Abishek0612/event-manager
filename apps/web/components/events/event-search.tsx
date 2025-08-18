"use client";

import React from "react";
import { useEventStore } from "@/stores/event-store";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

export const EventSearch: React.FC = () => {
  const { filters, setFilters } = useEventStore();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Search events by name or description..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            icon={<Search className="h-4 w-4 text-gray-400" />}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({
                category: e.target.value as any,
              })
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="meeting">Meeting</option>
            <option value="other">Other</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({
                status: e.target.value as any,
              })
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Today</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({
                priority: e.target.value as any,
              })
            }
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600">Sort by:</span>

        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({
              sortBy: e.target.value as any,
            })
          }
          className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Date</option>
          <option value="name">Name</option>
          <option value="created">Created</option>
          <option value="priority">Priority</option>
        </select>

        <button
          onClick={() =>
            setFilters({
              sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
            })
          }
          className="p-1 hover:bg-gray-100 rounded"
          title={`Sort ${
            filters.sortOrder === "asc" ? "Descending" : "Ascending"
          }`}
        >
          {filters.sortOrder === "asc" ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </button>

        {/* Clear Filters */}
        {(filters.search ||
          filters.category !== "all" ||
          filters.status !== "all" ||
          filters.priority !== "all") && (
          <button
            onClick={() =>
              setFilters({
                search: "",
                category: "all",
                status: "all",
                priority: "all",
              })
            }
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
