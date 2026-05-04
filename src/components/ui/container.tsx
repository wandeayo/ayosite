import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

/**
 * Page-width container with site-standard horizontal gutters.
 * Use for any top-level section so spacing stays consistent.
 */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--container-page)] px-[clamp(20px,4vw,56px)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
