import type { ReactNode } from "react";

type ComparisonTableProps = { headings: ReactNode[]; rows: ReactNode[][]; variant?: "white" | "pink" };

export function ComparisonTable({ headings, rows, variant = "pink" }: ComparisonTableProps) {
  return <table className={`research-methods-table research-methods-table-${variant}`} data-component="ComparisonTable"><thead><tr>{headings.map((heading, index) => <th key={index}>{heading}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table>;
}
