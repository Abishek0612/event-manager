import * as XLSX from "xlsx";
import { Event } from "@/types/event";

export const exportToExcel = (events: Event[], filename = "events") => {
  const excelData = events.map((event) => ({
    "Event Name": event.name,
    Date: new Date(event.date).toLocaleDateString(),
    Category: event.category,
    Priority: event.priority,
    Status: event.status,
    Description: event.description || "",
    Created: event.createdAt.toLocaleDateString(),
    "Last Updated": event.updatedAt.toLocaleDateString(),
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);

  const colWidths = Object.keys(excelData[0] || {}).map((key) => ({
    wch: Math.max(key.length, 15),
  }));
  ws["!cols"] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Events");

  XLSX.writeFile(
    wb,
    `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

export const exportToCSV = (events: Event[], filename = "events") => {
  const csvData = events.map((event) => ({
    "Event Name": event.name,
    Date: new Date(event.date).toLocaleDateString(),
    Category: event.category,
    Priority: event.priority,
    Status: event.status,
    Description: event.description || "",
    Created: event.createdAt.toLocaleDateString(),
  }));

  const ws = XLSX.utils.json_to_sheet(csvData);
  const csv = XLSX.utils.sheet_to_csv(ws);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
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
