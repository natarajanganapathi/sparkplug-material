import { Input, ElementRef, Directive } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { takeUntil } from "rxjs/operators";

import { DirectiveBase } from "@freshthought/cdk/platform";

import {
  FtcBreakpointSizeMap,
  FtcScreenSize,
} from "../common/breakpoint-size-map";

@Directive({
  selector: "[ftcShow]",
  standalone: true,
})
export class FtcShow extends DirectiveBase {
  @Input() ftcShow: FtcScreenSize | FtcScreenSize[] = [];
  _display: string = "";
  _style: any;
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
            let size = FtcBreakpointSizeMap.get(query);
            this._style.display =
              size && this.ftcShow.includes(size) ? this._display : "none";
            return;
          }
        }
      });
  }
}
