export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-medium text-accent">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h1>
      {lead ? <p className="mt-4 text-lg text-muted">{lead}</p> : null}
    </header>
  );
}
