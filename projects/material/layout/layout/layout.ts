import {
  Component,
  Input,
  ElementRef,
  booleanAttribute,
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
  @Input() leftSidenavMode: MatDrawerMode = "side";
  @Input() rightSidenavMode: MatDrawerMode = "over";

  @Input({ transform: numberAttribute }) leftSidenavMinWidthPx: number = 75;
  @Input({ transform: numberAttribute }) leftSidenavMaxWidthPx: number = 250;

  @Input({ transform: numberAttribute }) rightSidenavMinWidthPx: number = 75;
  @Input({ transform: numberAttribute }) rightSidenavMaxWidthPx: number = 250;

  @Input({ transform: booleanAttribute }) fullscreen: boolean = false;

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

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
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
    // this.resizeHeight();
  }

  // @HostListener("window:resize", ["$event"])
  // onResize(event: Event): void {
  //   this.resizeHeight();
  // }

  // resizeHeight(): void {
  //   const layoutParentElement = this.elementRef.nativeElement
  //     .parentElement as HTMLElement;
  //   if (layoutParentElement) {
  //     layoutParentElement.style.maxHeight = `${window.innerHeight}px`;
  //   }
  // }

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
}
