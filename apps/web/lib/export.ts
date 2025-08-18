import { Event } from "@/types/event";

export const exportToCSV = (events: Event[], filename = "events") => {
  const csvContent = [
    "Event Name,Date,Category,Priority,Status,Description,Created,Last Updated",
    ...events.map((event) =>
      [
        `"${event.name}"`,
        new Date(event.date).toLocaleDateString(),
        event.category,
        event.priority,
        event.status,
        `"${event.description || ""}"`,
        event.createdAt.toLocaleDateString(),
        event.updatedAt.toLocaleDateString(),
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (events: Event[], filename = "events") => {
  const jsonContent = JSON.stringify(events, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}_${new Date().toISOString().split("T")[0]}.json`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
