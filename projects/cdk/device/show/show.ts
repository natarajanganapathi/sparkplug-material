import { Input, ElementRef, Directive } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";

import { DirectiveBase } from "@freshthought/cdk/platform";

type Breakpoint = keyof BreakpointState;

@Directive({
  selector: "[ftcShow]",
  standalone: true,
})
export class FtcShow extends DirectiveBase {
  @Input("show") showOnBreakpoints: Breakpoint[] = [];
  constructor(
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    super();
  }
  ngOnInit(): void {
    this.breakpointObserver
      .observe(this.showOnBreakpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (!state.matches) {
          this.elementRef.nativeElement.style.display = "none";
        }
      });
  }
}
