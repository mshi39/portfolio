type ComparisonTableProps = { headings: [string, string]; rows: Array<[string, string]>; variant?: "white" | "pink" };

export function ComparisonTable({ headings, rows, variant = "pink" }: ComparisonTableProps) {
  return <table className={`research-methods-table research-methods-table-${variant}`} data-component="ComparisonTable"><thead><tr><th>{headings[0]}</th><th>{headings[1]}</th></tr></thead><tbody>{rows.map(([left, right]) => <tr key={left}><td>{left}</td><td>{right}</td></tr>)}</tbody></table>;
}
