"use client";

import SkiButton from "@/components/shared/button";
import { LuDownload } from "react-icons/lu";

interface DownloadCsvButtonProperties extends ButtonProperties {
  data: Record<string, unknown>[];
  filename: string;
  headers?: Record<string, string>; // Optional mapping of data keys to display headers
  className?: string;
}

/**
 * Converts array of objects to CSV string format
 */
const convertToCSV = (data: Record<string, unknown>[], headers?: Record<string, string>): string => {
  if (!data || data.length === 0) return "";

  // Get all unique keys from the data
  const allKeys = [...new Set(data.flatMap((item) => Object.keys(item)))];

  // Use provided headers or default to the keys
  const csvHeaders = headers ? allKeys.map((key) => headers[key] || key) : allKeys;

  // Create CSV header row
  const headerRow = csvHeaders.join(",");

  // Create CSV data rows
  const dataRows = data.map((item) => {
    return allKeys
      .map((key) => {
        const value = item[key];
        let stringValue: string;

        // Handle different data types
        if (value === null || value === undefined) {
          stringValue = "";
        } else if (typeof value === "object") {
          stringValue = JSON.stringify(value);
        } else {
          stringValue = String(value);
        }

        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
          stringValue = '"' + stringValue.replaceAll('"', '""') + '"';
        }

        return stringValue;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

/**
 * Reusable CSV download button component
 */
export const DownloadCsvButton: React.FC<DownloadCsvButtonProperties> = ({
  data,
  filename,
  headers,
  variant = "outline",
  size = "lg",
  className,
}) => {
  const downloadCSV = () => {
    if (!data || data.length === 0) {
      return;
    }

    const csvContent = convertToCSV(data, headers);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}.csv`);
      link.style.visibility = "hidden";
      document.body.append(link);
      link.click();
      link.remove();
    }
  };

  return (
    <SkiButton
      variant={variant}
      size={size}
      onClick={downloadCSV}
      isLeftIconVisible
      icon={<LuDownload />}
      className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground !text-xs !font-medium ${className}`}
      isDisabled={!data || data.length === 0}
    >
      Download As CSV
    </SkiButton>
  );
};
