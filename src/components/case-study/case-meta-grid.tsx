export interface CaseMetaItem {
  label: string;
  value: string;
  /** Tints the value with the accent colour. */
  highlight?: boolean;
}

/**
 * Four-column metadata strip for case-study heroes.
 * Caller hands in the items so the layout stays the same across studies.
 */
export function CaseMetaGrid({ items }: { items: CaseMetaItem[] }) {
  return (
    <dl className="mb-15 grid grid-cols-2 gap-8 border-b border-line pb-6 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
            {item.label}
          </dt>
          <dd className={item.highlight ? "text-[14px] text-accent" : "text-[14px] text-ink"}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
