export function Notice({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warning";
}) {
  const toneClass =
    tone === "warning"
      ? "border-warning-border bg-warning"
      : "border-border bg-surface";

  return (
    <aside className={`rounded-2xl border p-4 text-sm leading-6 ${toneClass}`}>
      {children}
    </aside>
  );
}
