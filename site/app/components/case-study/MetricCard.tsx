export function MetricCard({ value, label, variant = "pink" }: { value: string; label: string; variant?: "pink" | "white" }) {
  return <article className={`metric-card${variant === "white" ? " metric-card-white" : ""}`} data-component="MetricCard"><strong>{value}</strong><span>{label}</span></article>;
}
