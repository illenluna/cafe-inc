export function Tag({ label, variant = "ink" }: { label: string; variant?: "olive" | "rose" | "ink" }) {
  return <span className={`tag tag--${variant}`}>{label}</span>;
}
