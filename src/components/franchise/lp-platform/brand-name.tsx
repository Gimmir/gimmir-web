"use client";

import { useFranchise } from "@/components/franchise/franchise-context";

/** The visitor's brand name, typed in the numbers chapter. */
export function BrandName() {
  return <>{useFranchise().brand.name}</>;
}
