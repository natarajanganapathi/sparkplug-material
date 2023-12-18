import { Input, OnInit, ElementRef, Directive } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";

import { DirectiveBase } from "@freshthought/cdk/platform";

import {
  FtcBreakpointSizeMap,
  FtcScreenSize,
} from "../common/breakpoint-size-map";

@Directive({
  selector: "[ftcHide]",
  standalone: true,
})
export class FtcHide extends DirectiveBase implements OnInit {
  @Input() ftcHide: FtcScreenSize | FtcScreenSize[] = [];
  _display: string = "block";
  _style: { display: string };
  constructor(
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    super();
    this._style = this.elementRef.nativeElement.style;
    this._display = this._style.display;
  }
  ngOnInit(): void {
    this.breakpointObserver
      .observe([...FtcBreakpointSizeMap.keys()])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const size = FtcBreakpointSizeMap.get(query);
            this._style.display =
              size && this.ftcHide.includes(size) ? "none" : this._display;
            return;
          }
        }
      });
  }
}
