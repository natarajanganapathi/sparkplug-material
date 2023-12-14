import { Input, ElementRef, Directive } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";

import { DirectiveBase } from "@freshthought/cdk/platform";

type Breakpoint = keyof BreakpointState;

@Directive({
  selector: "[ftcHide]",
  standalone: true,
})
export class FtcHide extends DirectiveBase {
  @Input("hide") hideOnBreakpoints: Breakpoint[] = [];
  constructor(
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    super();
  }
  ngOnInit(): void {
    this.breakpointObserver
      .observe(this.hideOnBreakpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (state.matches) {
          this.elementRef.nativeElement.style.display = "none";
        }
      });
  }
}
