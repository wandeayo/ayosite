/**
 * Tiny class-name joiner. Filters out falsy values so callers can do
 * cn("base", isActive && "active") without ternary noise.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
