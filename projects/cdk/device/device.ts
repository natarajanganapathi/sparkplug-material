import { Injectable } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";

@Injectable({
  providedIn: "root",
})
export class CdkDevice {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isHandset(): boolean {
    return this.breakpointObserver.isMatched("(max-width: 767px)");
  }

  isTablet(): boolean {
    return this.breakpointObserver.isMatched(
      "(min-width: 768px) and (max-width: 991px)"
    );
  }

  isDesktop(): boolean {
    return this.breakpointObserver.isMatched("(min-width: 992px)");
  }
}
