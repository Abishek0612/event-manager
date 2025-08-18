"use client";

import React from "react";
import { useEventStore } from "@/stores/event-store";
import { Card } from "@/components/ui/card";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const EventStats: React.FC = () => {
  const { stats } = useEventStore();

  const statCards = [
    {
      title: "Total Events",
      value: stats.total,
      icon: CalendarDaysIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      icon: ClockIcon,
      color: "text-orange-600 bg-orange-50",
    },
    {
      title: "Today",
      value: stats.ongoing,
      icon: ExclamationTriangleIcon,
      color: "text-red-600 bg-red-50",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircleIcon,
      color: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
