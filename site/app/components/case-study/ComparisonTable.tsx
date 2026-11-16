import type { ReactNode } from "react";

type ComparisonTableProps = { headings: [ReactNode, ReactNode]; rows: Array<[ReactNode, ReactNode]>; variant?: "white" | "pink" };

export function ComparisonTable({ headings, rows, variant = "pink" }: ComparisonTableProps) {
  return <table className={`research-methods-table research-methods-table-${variant}`} data-component="ComparisonTable"><thead><tr><th>{headings[0]}</th><th>{headings[1]}</th></tr></thead><tbody>{rows.map(([left, right], index) => <tr key={index}><td>{left}</td><td>{right}</td></tr>)}</tbody></table>;
}
