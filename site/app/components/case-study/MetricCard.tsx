export function MetricCard({ value, label }: { value: string; label: string }) {
  return <article className="metric-card" data-component="MetricCard"><strong>{value}</strong><span>{label}</span></article>;
}
