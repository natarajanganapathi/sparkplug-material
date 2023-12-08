import {
  Component,
  Input,
  HostListener,
  ElementRef,
  booleanAttribute,
  ViewChild,
  AfterViewInit,
  Renderer2
} from "@angular/core";
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
  ],
  standalone: true,
  animations: [
    trigger("contentMarginLeft", [
      state("false", style({ marginLeft: "{{minWidthPx}}" }), {
        params: { minWidthPx: "1px" },
      }),
      state("true", style({ marginLeft: "{{maxWidthPx}}" }), {
        params: { maxWidthPx: "1px" },
      }),
      transition("false <=> true", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class FtcLayout implements AfterViewInit {
  @Input() leftSidenavMode: MatDrawerMode = "side";

  _leftSidenavMinWidthPx: number = 75;
  @Input() get leftSidenavMinWidthPx(): number {
    return this.leftSidenavMode === "side" ? this._leftSidenavMinWidthPx : 0;
  }
  set leftSidenavMinWidthPx(value: number) {
    this._leftSidenavMinWidthPx = value;
  }

  @Input() leftSidenavMaxWidthPx: number = 300;
  @Input({ transform: booleanAttribute }) fullscreen: boolean = false;
  @ViewChild("leftSideNav") leftSideNav?: MatSidenav;

  get isLeftOpened(): boolean {
    return this.leftSidenavMode === "side";
  }
  // leftSidenavWidthTest:number = 1;

  get leftSidenavWidth(): { min: number; max: number } {
    return {
      min: this.leftSidenavMinWidthPx,
      max: this.leftSidenavMaxWidthPx,
    };
  }

  get contentMarginLeft() {
    return {
      value: this.leftSideNav?._getWidth() === this.leftSidenavMaxWidthPx,
      params: {
        minWidthPx: `${this.leftSidenavMinWidthPx}px`,
        maxWidthPx: `${this.leftSidenavMaxWidthPx}px`,
      },
    };
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.resizeHeight();
  }
  ngAfterViewInit(): void {
    if (this.isLeftOpened) {
      this.setSidenavWidth(this.leftSideNav!, this.leftSidenavMaxWidthPx);
    }
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
  toggleSidenav(sidenav: MatSidenav, width: { min: number; max: number }) {
    if (sidenav.mode === "side") {
      var value = sidenav._getWidth() === width.min ? width.max : width.min;
      this.setSidenavWidth(sidenav, value);
    } else {
      sidenav.toggle();
    }
  }
  setSidenavWidth(sidenav: MatSidenav, width: number) {
    // sidenav._content.nativeElement.style.width = `${width}px`;
    // this.renderer.setStyle(sidenav._content.nativeElement, 'width', `${width}px`);
    sidenav._content.nativeElement.style.setProperty('width', `${width}px`);
  }

  toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
}
