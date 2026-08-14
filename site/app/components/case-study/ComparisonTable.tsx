type ComparisonTableProps = { headings: [string, string]; rows: Array<[string, string]> };

export function ComparisonTable({ headings, rows }: ComparisonTableProps) {
  return <table className="research-methods-table" data-component="ComparisonTable"><thead><tr><th>{headings[0]}</th><th>{headings[1]}</th></tr></thead><tbody>{rows.map(([left, right]) => <tr key={left}><td>{left}</td><td>{right}</td></tr>)}</tbody></table>;
}
