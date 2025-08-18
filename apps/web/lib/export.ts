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

  downloadFile(csvContent, `${filename}_${getTimestamp()}.csv`, "text/csv");
};

export const exportToJSON = (events: Event[], filename = "events") => {
  const jsonContent = JSON.stringify(events, null, 2);
  downloadFile(
    jsonContent,
    `${filename}_${getTimestamp()}.json`,
    "application/json"
  );
};

export const exportToExcel = (events: Event[], filename = "events") => {
  // Create Excel-compatible CSV with UTF-8 BOM
  const BOM = "\uFEFF";
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

  downloadFile(
    BOM + csvContent,
    `${filename}_${getTimestamp()}.csv`,
    "text/csv"
  );
};

export const exportToTXT = (events: Event[], filename = "events") => {
  const txtContent = events
    .map(
      (event) =>
        `Event: ${event.name}\n` +
        `Date: ${new Date(event.date).toLocaleDateString()}\n` +
        `Category: ${event.category}\n` +
        `Priority: ${event.priority}\n` +
        `Status: ${event.status}\n` +
        `Description: ${event.description || "N/A"}\n` +
        `Created: ${event.createdAt.toLocaleDateString()}\n` +
        `---\n`
    )
    .join("\n");

  downloadFile(txtContent, `${filename}_${getTimestamp()}.txt`, "text/plain");
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const getTimestamp = () => {
  return new Date().toISOString().split("T")[0];
};

export const importFromJSON = (file: File): Promise<Event[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const events = JSON.parse(content);

        const validatedEvents = events.map((event: any) => ({
          ...event,
          id: event.id || crypto.randomUUID(),
          createdAt: new Date(event.createdAt || Date.now()),
          updatedAt: new Date(event.updatedAt || Date.now()),
        }));

        resolve(validatedEvents);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};
