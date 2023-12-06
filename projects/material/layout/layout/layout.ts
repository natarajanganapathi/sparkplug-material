import { Component, Input, HostListener, ElementRef } from "@angular/core";

import { MatSidenavModule, MatDrawerMode } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterOutlet, RouterModule } from "@angular/router";

import { BooleanInput } from "@angular/cdk/coercion";

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
})
export class FtcLayout {
  @Input() sidenavMinWidth: number = 75;
  @Input() sidenavMaxWidth: number = 275;
  @Input() mode: MatDrawerMode = "side";
  @Input() fullscreen: BooleanInput;
  isSidenavOpened = true;
  opened = true;
  sidenavWidth = `${this.sidenavMaxWidth}px`;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.resizeHeight();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.resizeHeight();
  }

  private resizeHeight(): void {
    const layoutParentElement = this.elementRef.nativeElement
      .parentElement as HTMLElement;
    if (layoutParentElement) {
      layoutParentElement.style.maxHeight = `${window.innerHeight}px`;
    }
  }
  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
    this.opened = this.sidenavMinWidth === 0 ? false : true;
    this.sidenavWidth = `${
      this.isSidenavOpened ? this.sidenavMaxWidth : this.sidenavMinWidth
    }px`;
  }

  toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
}
