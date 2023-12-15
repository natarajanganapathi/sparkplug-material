import { Breakpoints } from "@angular/cdk/layout";

export type FtcScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

export const FtcBreakpointSizeMap = new Map<string, FtcScreenSize>([
  [Breakpoints.XSmall, "xs"],
  [Breakpoints.Small, "sm"],
  [Breakpoints.Medium, "md"],
  [Breakpoints.Large, "lg"],
  [Breakpoints.XLarge, "xl"],
]);
