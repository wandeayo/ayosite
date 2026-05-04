import type { ComponentType } from "react";

import { CarmenAICase } from "@/components/case-study/carmen-ai";

/**
 * Slug → case-study component. Add a new case study by writing its component
 * (mirror the Carmen AI structure with the reusable case-study primitives) and
 * registering it here. Anything not in this map renders the in-progress fallback.
 */
export const CASE_STUDIES: Record<string, ComponentType> = {
  "carmen-ai": CarmenAICase,
};
