import {
  Component,
  Input,
  numberAttribute,
  ViewChild,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import {
  MatSidenavModule,
  MatDrawerMode,
  MatSidenav,
} from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterOutlet, RouterModule } from "@angular/router";
import {
  LayoutModule,
  BreakpointObserver,
  Breakpoints,
} from "@angular/cdk/layout";
import { Subject, takeUntil } from "rxjs";

declare type MinMaxWidth = { minWidth: string; maxWidth: string };

@Component({
  selector: "ftc-layout",
  templateUrl: "layout.html",
  styleUrls: ["layout.scss"],
  exportAs: "ftcLayout",
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    MatIconModule,
    RouterModule,
    CommonModule,
    LayoutModule,
  ],
  standalone: true,
  animations: [
    trigger("contentMarginLeft", [
      state("false", style({ marginLeft: "{{minWidth}}" }), {
        params: { minWidth: "0px" },
      }),
      state("true", style({ marginLeft: "{{maxWidth}}" }), {
        params: { maxWidth: "0px" },
      }),
      transition("true <=> false", animate("0.3s ease-in-out")),
    ]),
    trigger("contentMarginRight", [
      state("false", style({ marginRight: "{{minWidth}}" }), {
        params: { minWidth: "0px" },
      }),
      state("true", style({ marginRight: "{{maxWidth}}" }), {
        params: { maxWidth: "0px" },
      }),
      transition("true <=> false", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class FtcLayout {
  private _leftSidenavMode: MatDrawerMode = "side";
  private _rightSidenavMode: MatDrawerMode = "over";

  private modeSubject = new Subject<{
    mode: MatDrawerMode;
    side: "left" | "right";
  }>();

  @Input()
  get leftSidenavMode(): MatDrawerMode {
    return this._leftSidenavMode;
  }

  set leftSidenavMode(value: MatDrawerMode) {
    this._leftSidenavMode = value;
    this.modeSubject.next({ mode: value, side: "left" });
  }

  @Input()
  get rightSidenavMode(): MatDrawerMode {
    return this._rightSidenavMode;
  }

  set rightSidenavMode(value: MatDrawerMode) {
    this._rightSidenavMode = value;
    this.modeSubject.next({ mode: value, side: "right" });
  }

  @Input({ transform: numberAttribute }) leftSidenavMinWidthPx: number = 75;
  @Input({ transform: numberAttribute }) leftSidenavMaxWidthPx: number = 250;

  @Input({ transform: numberAttribute }) rightSidenavMinWidthPx: number = 75;
  @Input({ transform: numberAttribute }) rightSidenavMaxWidthPx: number = 250;

  @ViewChild("leftSideNav") leftSidenav?: MatSidenav;
  @ViewChild("rightSideNav") rightSidenav?: MatSidenav;

  leftAlwaysOpened = signal(false);
  rightAlwaysOpened = signal(false);

  leftSidenavWidth = signal(0);
  rightSidenavWidth = signal(0);

  contentMarginLeft = signal(true);
  contentMarginRight = signal(true);

  leftSidenavMinMaxWidth: MinMaxWidth = { minWidth: `0px`, maxWidth: `0px` };
  rightSidenavMinMaxWidth: MinMaxWidth = { minWidth: `0px`, maxWidth: `0px` };

  layoutChanges = this.breakpointObserver.observe([
    "(orientation: portrait)",
    "(orientation: landscape)",
  ]);
  private readonly destroyed = new Subject<void>();
  breakPointModeMap = new Map<
    string,
    { left: MatDrawerMode; right: MatDrawerMode }
  >([
    [Breakpoints.XSmall, { left: "over", right: "over" }],
    [Breakpoints.Small, { left: "side", right: "over" }],
    [Breakpoints.Medium, { left: "side", right: "over" }],
    [Breakpoints.Large, { left: "side", right: "over" }],
    [Breakpoints.XLarge, { left: "side", right: "over" }],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.modeSubject
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.applyLayoutProperties());
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([...this.breakPointModeMap.keys()])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            let { left, right } = this.breakPointModeMap.get(query) ?? {
              left: this.leftSidenavMode,
              right: this.rightSidenavMode,
            };
            this.leftSidenavMode = left;
            this.rightSidenavMode = right;
          }
        }
      });
  }

  applyLayoutProperties() {
    this.leftSidenavMinWidthPx =
      this.leftSidenavMode === "side" ? this.leftSidenavMinWidthPx : 0;
    this.leftSidenavMinMaxWidth = {
      minWidth: `${this.leftSidenavMinWidthPx}px`,
      maxWidth: `${this.leftSidenavMaxWidthPx}px`,
    };

    this.rightSidenavMinWidthPx =
      this.rightSidenavMode === "side" ? this.rightSidenavMinWidthPx : 0;
    this.rightSidenavMinMaxWidth = {
      minWidth: `${this.rightSidenavMinWidthPx}px`,
      maxWidth: `${this.rightSidenavMaxWidthPx}px`,
    };

    this.leftAlwaysOpened.set(
      this.leftSidenavMode === "side" && this.leftSidenavMinWidthPx > 0
    );

    this.rightAlwaysOpened.set(
      this.rightSidenavMode === "side" && this.rightSidenavMinWidthPx > 0
    );

    this.leftSidenavWidth.set(this.leftSidenavMaxWidthPx);
    this.rightSidenavWidth.set(this.rightSidenavMaxWidthPx);

    this.contentMarginLeft.set(this.leftAlwaysOpened());
    this.contentMarginRight.set(this.rightAlwaysOpened());
  }

  toggleLeftSidenav() {
    if (this.leftAlwaysOpened()) {
      this.contentMarginLeft.update((value) => !value);
      this.leftSidenavWidth.set(
        this.contentMarginLeft()
          ? this.leftSidenavMaxWidthPx
          : this.leftSidenavMinWidthPx
      );
    } else {
      this.leftSidenav?.toggle();
    }
  }

  toggleRightSidenav() {
    if (this.rightAlwaysOpened()) {
      this.contentMarginRight.update((value) => !value);
      this.rightSidenavWidth.set(
        this.contentMarginRight()
          ? this.rightSidenavMaxWidthPx
          : this.rightSidenavMinWidthPx
      );
    } else {
      this.rightSidenav?.toggle();
    }
  }

  toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
