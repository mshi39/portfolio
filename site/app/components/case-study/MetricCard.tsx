export function MetricCard({ value, label }: { value: string; label: string }) {
  return <article className="metric-card"><strong>{value}</strong><span>{label}</span></article>;
}
