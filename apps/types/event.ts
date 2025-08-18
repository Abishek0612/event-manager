export interface Event {
  id: string;
  name: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
  status: "upcoming" | "ongoing" | "completed";
  category: "work" | "personal" | "meeting" | "other";
  priority: "low" | "medium" | "high";
  description?: string;
}

export interface EventFormData {
  name: string;
  date: string;
  category: Event["category"];
  priority: Event["priority"];
  description?: string;
}

export interface EventFilters {
  search: string;
  category: Event["category"] | "all";
  status: Event["status"] | "all";
  priority: Event["priority"] | "all";
  sortBy: "name" | "date" | "created" | "priority";
  sortOrder: "asc" | "desc";
}

export interface EventStats {
  total: number;
  upcoming: number;
  ongoing: number;
  completed: number;
  byCategory: Record<Event["category"], number>;
  byPriority: Record<Event["priority"], number>;
}
