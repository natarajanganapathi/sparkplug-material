import { Injectable } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";


@Injectable({
  providedIn: "root",
})
export class FtcDevice {
  constructor(private breakpointObserver: BreakpointObserver) {}

  get isHandset(): boolean {
    return this.isMatched("(max-width: 767px)");
  }

  get isTablet(): boolean {
    return this.isMatched("(min-width: 768px) and (max-width: 991px)");
  }

  get isDesktop(): boolean {
    return this.isMatched("(min-width: 992px)");
  }
  isMatched(query: string) {
    return this.breakpointObserver.isMatched(query);
  }
}
