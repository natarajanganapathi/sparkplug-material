import {
  Component,
  Input,
  HostListener,
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
      state("false", style({ marginLeft: "{{minWidthPx}}" }), {
        params: { minWidthPx: "0px" },
      }),
      state("true", style({ marginLeft: "{{maxWidthPx}}" }), {
        params: { maxWidthPx: "0px" },
      }),
      transition("false <=> true", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class FtcLayout {
  @Input() leftSidenavMode: MatDrawerMode = "side";
  @Input() rightSidenavMode: MatDrawerMode = "over";

  _leftSidenavMinWidthPx: number = 75;
  @Input({ transform: numberAttribute }) get leftSidenavMinWidthPx(): number {
    return this.leftSidenavMode === "side" ? this._leftSidenavMinWidthPx : 0;
  }
  set leftSidenavMinWidthPx(value: number) {
    this._leftSidenavMinWidthPx = value;
  }

  @Input({ transform: numberAttribute }) leftSidenavMaxWidthPx: number = 250;
  @Input({ transform: numberAttribute }) rightSidenavWidthPx: number = 250;
  @Input({ transform: booleanAttribute }) fullscreen: boolean = false;
  @ViewChild("leftSideNav") leftSidenav?: MatSidenav;
  @ViewChild("rightSideNav") rightSidenav?: MatSidenav;

  isLeftOpened = signal(this.leftSidenavMode === "side");

  get isRightOpened(): boolean {
    return false;
  }

  leftSidenavWidth = signal(
    this.leftSidenavMode === "side" ? this.leftSidenavMaxWidthPx : 0
  );
  leftSidenavMinMaxWidth = {
    minWidthPx: `${this.leftSidenavMinWidthPx}px`,
    maxWidthPx: `${this.leftSidenavMaxWidthPx}px`,
  };
  rightSidenavWidth: number = 0;
  contentMarginLeft = signal(!this.isLeftOpened());

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.leftSidenavMinWidthPx = this.leftSidenavMode === "side" ? this._leftSidenavMinWidthPx : 0;
    this.leftSidenavMinMaxWidth = {
      minWidthPx: `${this.leftSidenavMinWidthPx}px`,
      maxWidthPx: `${this.leftSidenavMaxWidthPx}px`,
    };
    this.isLeftOpened.set(this.leftSidenavMode === "side");
    this.contentMarginLeft.set(this.isLeftOpened());
    this.resizeHeight();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.resizeHeight();
  }

  resizeHeight(): void {
    const layoutParentElement = this.elementRef.nativeElement
      .parentElement as HTMLElement;
    if (layoutParentElement) {
      layoutParentElement.style.maxHeight = `${window.innerHeight}px`;
    }
  }
  toggleLeftSidenav() {
    if (this.leftSidenav?.mode === "side") {
      this.leftSidenavWidth.update((value) => {
        return value === this.leftSidenavMaxWidthPx
          ? this.leftSidenavMinWidthPx
          : this.leftSidenavMaxWidthPx;
      });
      this.contentMarginLeft.update((value) => !value);
    } else {
      this.leftSidenav?.toggle();
    }
  }

  toggleRightSidenav() {
    this.rightSidenav?.toggle();
  }

  toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
}
