import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

type Variant = "ghost" | "primary";

const baseClasses =
  "group inline-flex cursor-pointer items-center gap-3 rounded-full border px-[22px] py-[14px] font-mono text-[12px] uppercase tracking-[0.08em] transition-all duration-300 ease-[var(--ease-out-quart)]";

const variantClasses: Record<Variant, string> = {
  ghost: "border-line-strong text-ink hover:bg-bg-glass-strong",
  primary:
    "border-accent bg-accent text-accent-ink hover:bg-[color-mix(in_oklab,var(--color-accent)_88%,white)]",
};

interface CommonProps {
  variant?: Variant;
  trailingArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Pill button. Renders as <button> by default or as a <Link>/anchor when
 * given an href, so navigation buttons stay accessible without ceremony.
 */
export function Button(props: ButtonProps) {
  const { variant = "ghost", trailingArrow, className, children } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  const inner = (
    <>
      <span>{children}</span>
      {trailingArrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("http") || props.href.startsWith("mailto:");
    if (isExternal) {
      const { variant: _v, trailingArrow: _t, className: _c, children: _ch, ...rest } = props;
      return (
        <a className={classes} {...rest}>
          {inner}
        </a>
      );
    }
    const { variant: _v, trailingArrow: _t, className: _c, children: _ch, href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, trailingArrow: _t, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
