import {
  Component,
  ViewChild,
  signal,
  InjectionToken,
  Optional,
  Inject,
  OnInit,
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
import { takeUntil } from "rxjs";
import { ComponentBase } from "@freshthought/cdk/platform";

export type FtcDrawerMode = MatDrawerMode;
declare type MinMaxWidth = { minWidth: number; maxWidth: number };
declare type FtcSidenavConfig = { mode: FtcDrawerMode } & MinMaxWidth;
declare type FtcLayoutConfig = {
  left: FtcSidenavConfig;
  right: FtcSidenavConfig;
};

export interface FtcLayoutOptions extends Map<string, FtcLayoutConfig> {}

export const FTC_LAYOUT_DEFAULT_OPTIONS = new InjectionToken<FtcLayoutOptions>(
  "ftc-layout-default-options",
  {
    providedIn: "root",
    factory: FTC_LAYOUT_DEFAULT_OPTIONS_FACTORY,
  }
);

function sidenav(mode: FtcDrawerMode): FtcSidenavConfig {
  return { mode, minWidth: 75, maxWidth: 250 };
}

export function FTC_LAYOUT_DEFAULT_OPTIONS_FACTORY(): FtcLayoutOptions {
  return new Map<string, FtcLayoutConfig>([
    [Breakpoints.XSmall, { left: sidenav("over"), right: sidenav("over") }],
    [Breakpoints.Small, { left: sidenav("over"), right: sidenav("over") }],
    [Breakpoints.Medium, { left: sidenav("side"), right: sidenav("over") }],
    [Breakpoints.Large, { left: sidenav("side"), right: sidenav("over") }],
    [Breakpoints.XLarge, { left: sidenav("side"), right: sidenav("over") }],
  ]);
}
export function getSidenavConfig(
  mode: FtcDrawerMode,
  minWidth: number,
  maxWidth: number
): FtcSidenavConfig {
  return { mode, minWidth, maxWidth };
}

const defaults = FTC_LAYOUT_DEFAULT_OPTIONS_FACTORY();

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
      state("false", style({ marginLeft: "{{minWidth}}px" }), {
        params: { minWidth: 0 },
      }),
      state("true", style({ marginLeft: "{{maxWidth}}px" }), {
        params: { maxWidth: 0 },
      }),
      transition("true <=> false", animate("0.3s ease-in-out")),
    ]),
    trigger("contentMarginRight", [
      state("false", style({ marginRight: "{{minWidth}}px" }), {
        params: { minWidth: 0 },
      }),
      state("true", style({ marginRight: "{{maxWidth}}px" }), {
        params: { maxWidth: 0 },
      }),
      transition("true <=> false", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class FtcLayout extends ComponentBase implements OnInit {
  @ViewChild("leftSideNav") leftSidenav?: MatSidenav;
  @ViewChild("rightSideNav") rightSidenav?: MatSidenav;

  layoutConfig = signal(this.layoutOptions.get(Breakpoints.Large)!);

  get leftSidenavMode(): FtcDrawerMode {
    return this.layoutConfig().left.mode;
  }

  get rightSidenavMode(): FtcDrawerMode {
    return this.layoutConfig().right.mode;
  }

  leftAlwaysOpened = signal(false);
  rightAlwaysOpened = signal(false);

  leftSidenavWidth = signal(0);
  rightSidenavWidth = signal(0);

  contentMarginLeft = signal(true);
  contentMarginRight = signal(true);

  leftSidenavMinMaxWidth: MinMaxWidth = { minWidth: 0, maxWidth: 0 };
  rightSidenavMinMaxWidth: MinMaxWidth = { minWidth: 0, maxWidth: 0 };

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Optional()
    @Inject(FTC_LAYOUT_DEFAULT_OPTIONS)
    private layoutOptions: FtcLayoutOptions
  ) {
    super();
    layoutOptions = layoutOptions || defaults;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([...this.layoutOptions.keys()])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (this.layoutOptions.has(query)) {
            const config = this.layoutOptions.get(query)!;
            this.applyLayoutProperties(config);
            break;
          }
        }
      });
  }

  toggleRightSidenav() {
    if (this.rightAlwaysOpened()) {
      this.contentMarginRight.update((value) => !value);
      this.rightSidenavWidth.set(
        this.contentMarginRight()
          ? this.rightSidenavMinMaxWidth.maxWidth
          : this.rightSidenavMinMaxWidth.minWidth
      );
    } else {
      this.rightSidenav?.toggle();
    }
  }

  toggleLeftSidenav() {
    if (this.leftAlwaysOpened()) {
      this.contentMarginLeft.update((value) => !value);
      this.leftSidenavWidth.set(
        this.contentMarginLeft()
          ? this.leftSidenavMinMaxWidth.maxWidth
          : this.leftSidenavMinMaxWidth.minWidth
      );
    } else {
      this.leftSidenav?.toggle();
    }
  }

  applyLayoutProperties(config: FtcLayoutConfig) {
    this.layoutConfig.set(config);

    this.leftSidenavMinMaxWidth = this.sidenavWidht(config.left);
    this.rightSidenavMinMaxWidth = this.sidenavWidht(config.right);

    this.leftAlwaysOpened.set(this.isOpen(config.left));
    this.rightAlwaysOpened.set(this.isOpen(config.right));

    this.contentMarginLeft.set(this.leftAlwaysOpened());
    this.contentMarginRight.set(this.rightAlwaysOpened());

    this.leftSidenavWidth.set(config.left.maxWidth);
    this.rightSidenavWidth.set(config.right.maxWidth);
  }
  sidenavWidht(config: FtcSidenavConfig): MinMaxWidth {
    const minWidth = config.mode === "side" ? config.minWidth : 0;
    return { minWidth, maxWidth: config.maxWidth };
  }
  isOpen(config: FtcSidenavConfig) {
    return config.mode === "side" && config.minWidth > 0;
  }

  toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
}
