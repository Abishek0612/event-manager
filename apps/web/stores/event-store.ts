import { create } from "zustand";
import { Event, EventFilters, EventStats } from "@/types/event";
import {
  loadEventsFromStorage,
  saveEventsToStorage,
  generateEventStats,
} from "@/lib/storage";

interface EventStore {
  events: Event[];
  filteredEvents: Event[];
  filters: EventFilters;
  stats: EventStats;
  isLoading: boolean;

  addEvent: (
    event: Omit<Event, "id" | "createdAt" | "updatedAt" | "status">
  ) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  bulkDeleteEvents: (ids: string[]) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  loadEvents: () => void;
  clearAllEvents: () => void;

  applyFilters: () => void;
  updateStats: () => void;
}

const defaultFilters: EventFilters = {
  search: "",
  category: "all",
  status: "all",
  priority: "all",
  sortBy: "date",
  sortOrder: "asc",
};

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  filteredEvents: [],
  filters: defaultFilters,
  stats: {
    total: 0,
    upcoming: 0,
    ongoing: 0,
    completed: 0,
    byCategory: { work: 0, personal: 0, meeting: 0, other: 0 },
    byPriority: { low: 0, medium: 0, high: 0 },
  },
  isLoading: false,

  addEvent: (eventData) => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: new Date(eventData.date) > new Date() ? "upcoming" : "completed",
    };

    const updatedEvents = [...get().events, newEvent];
    set({ events: updatedEvents });
    saveEventsToStorage(updatedEvents);
    get().applyFilters();
    get().updateStats();
  },

  updateEvent: (id, updates) => {
    const updatedEvents = get().events.map((event) =>
      event.id === id ? { ...event, ...updates, updatedAt: new Date() } : event
    );

    set({ events: updatedEvents });
    saveEventsToStorage(updatedEvents);
    get().applyFilters();
    get().updateStats();
  },

  deleteEvent: (id) => {
    const updatedEvents = get().events.filter((event) => event.id !== id);
    set({ events: updatedEvents });
    saveEventsToStorage(updatedEvents);
    get().applyFilters();
    get().updateStats();
  },

  bulkDeleteEvents: (ids) => {
    const updatedEvents = get().events.filter(
      (event) => !ids.includes(event.id)
    );
    set({ events: updatedEvents });
    saveEventsToStorage(updatedEvents);
    get().applyFilters();
    get().updateStats();
  },

  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    set({ filters });
    get().applyFilters();
  },

  loadEvents: () => {
    set({ isLoading: true });
    const events = loadEventsFromStorage();
    set({ events, isLoading: false });
    get().applyFilters();
    get().updateStats();
  },

  clearAllEvents: () => {
    set({ events: [], filteredEvents: [] });
    saveEventsToStorage([]);
    get().updateStats();
  },

  applyFilters: () => {
    const { events, filters } = get();
    let filtered = [...events];

    if (filters.search) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (event) => event.category === filters.category
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((event) => event.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter(
        (event) => event.priority === filters.priority
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "created":
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case "priority":
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
      }

      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    set({ filteredEvents: filtered });
  },

  updateStats: () => {
    const { events } = get();
    const stats = generateEventStats(events);
    set({ stats });
  },
}));
