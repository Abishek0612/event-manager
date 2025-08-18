"use client";

import React from "react";
import { format } from "date-fns";
import { useEventStore } from "@/stores/event-store";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Trash2, Edit, Tag, AlertCircle } from "lucide-react";

interface EventItemProps {
  event: Event;
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { deleteEvent, updateEvent } = useEventStore();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event.id);
    }
  };

  const handleToggleStatus = () => {
    const newStatus = event.status === "completed" ? "upcoming" : "completed";
    updateEvent(event.id, { status: newStatus });
  };

  const getPriorityColor = (priority: Event["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
    }
  };

  const getCategoryColor = (category: Event["category"]) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800";
      case "personal":
        return "bg-purple-100 text-purple-800";
      case "meeting":
        return "bg-orange-100 text-orange-800";
      case "other":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {event.name}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                event.status
              )}`}
            >
              {event.status}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4" />
            {format(new Date(event.date), "PPP")}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(
                event.category
              )}`}
            >
              <Tag className="h-3 w-3 inline mr-1" />
              {event.category}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(
                event.priority
              )}`}
            >
              <AlertCircle className="h-3 w-3 inline mr-1" />
              {event.priority} priority
            </span>
          </div>

          {event.description && (
            <p className="text-sm text-gray-600 mt-2">{event.description}</p>
          )}

          <p className="text-xs text-gray-400 mt-2">
            Created: {format(event.createdAt, "PPp")}
          </p>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleStatus}
            className="p-2"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            className="p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
