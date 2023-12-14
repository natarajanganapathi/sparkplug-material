import { BreakpointObserver } from "@angular/cdk/layout";
import { ElementRef } from "@angular/core";

import { FtcShow } from "./show";

describe("FtcShow Directive", () => {
  let elementRef: ElementRef;
  let directive: FtcShow;
  let breakpointObserver: BreakpointObserver;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement("div"));
    directive = new FtcShow(elementRef, breakpointObserver);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });
});
