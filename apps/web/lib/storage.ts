import { Event, EventStats } from "@/types/event";

const STORAGE_KEY = "event-manager-events";

export const saveEventsToStorage = (events: Event[]): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

export const loadEventsFromStorage = (): Event[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const events = JSON.parse(stored);
    return events.map((event: any) => ({
      ...event,
      createdAt: new Date(event.createdAt),
      updatedAt: new Date(event.updatedAt),
    }));
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

export const generateEventStats = (events: Event[]): EventStats => {
  const now = new Date();

  return {
    total: events.length,
    upcoming: events.filter((e) => new Date(e.date) > now).length,
    ongoing: events.filter((e) => {
      const eventDate = new Date(e.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    }).length,
    completed: events.filter((e) => new Date(e.date) < now).length,
    byCategory: {
      work: events.filter((e) => e.category === "work").length,
      personal: events.filter((e) => e.category === "personal").length,
      meeting: events.filter((e) => e.category === "meeting").length,
      other: events.filter((e) => e.category === "other").length,
    },
    byPriority: {
      low: events.filter((e) => e.priority === "low").length,
      medium: events.filter((e) => e.priority === "medium").length,
      high: events.filter((e) => e.priority === "high").length,
    },
  };
};
