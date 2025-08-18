"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useEventStore } from "@/stores/event-store";
import { EventFormData } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export const EventForm: React.FC = () => {
  const addEvent = useEventStore((state) => state.addEvent);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    defaultValues: {
      category: "work",
      priority: "medium",
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      addEvent(data);
      reset();
      toast.success("Event added successfully!");
    } catch (error) {
      toast.error("Failed to add event");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Add New Event
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            label="Event Name"
            placeholder="Enter event name"
            {...register("name", {
              required: "Event name is required",
              minLength: {
                value: 2,
                message: "Event name must be at least 2 characters",
              },
            })}
            error={errors.name?.message}
          />

          <Input
            id="date"
            type="date"
            label="Date"
            icon={<CalendarIcon className="h-5 w-5 text-gray-400" />}
            {...register("date", {
              required: "Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return true; // Allow past dates for flexibility
              },
            })}
            error={errors.date?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="meeting">Meeting</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                {...register("priority", { required: "Priority is required" })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-sm text-red-600">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional event details..."
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Adding..." : "Add Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
