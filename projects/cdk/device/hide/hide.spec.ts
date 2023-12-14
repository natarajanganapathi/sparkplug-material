import { BreakpointObserver } from "@angular/cdk/layout";
import { ElementRef } from "@angular/core";

import { FtcHide } from "./hide";

describe("FtcShow Directive", () => {
  let elementRef: ElementRef;
  let directive: FtcHide;
  let breakpointObserver: BreakpointObserver;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement("div"));
    directive = new FtcHide(elementRef, breakpointObserver);
  });

  it("should create an instance", () => {
    expect(directive).toBeTruthy();
  });
});
