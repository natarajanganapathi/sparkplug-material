import {
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
  Output,
  HostListener,
  ElementRef,
  EventEmitter,
} from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

import { MatTreeModule } from "@angular/material/tree";

import { RouterOutlet } from "@angular/router";

import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { RouterModule } from "@angular/router";
import { BooleanInput } from "@angular/cdk/coercion";

export interface FtcLayoutMenu {
  label: string;
  route?: string;
  children?: FtcLayoutMenu[];
  cssClass?: string;
  icon?: string;
  action?: string;
}

// const MENU_DATA_TREE: FtcLayoutMenu[] = [
//   {
//     label: "Dashboard",
//     route: "/cds-summary",
//   },
//   {
//     label: "Deployments",
//     route: "/deployments",
//     children: [
//       { label: "QA1", route: "/qa1-deployment" },
//       { label: "QA2", route: "/qa2-deployment" },
//       { label: "QA3", route: "/qa3-deployment" },
//     ],
//   },
// ];

// export interface Menu {
//   id: number;
//   parentMenuId?: number | null;
//   moduleId?: number | null;
//   moduleCode?: string | null;
//   menuCode?: string | null;
//   parentMenuCode?: string | null;
//   menuType?: string | null;
//   menuPosition?: string | null;
//   label?: string | null;
//   sRef?: string | null;
//   iconRef?: string | null;
//   displayOrder?: number | null;
// }

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
    MatListModule,
    MatExpansionModule,
    MatTreeModule,
    RouterModule,
  ],
  standalone: true,
  outputs: ["trigger"],
})
export class FtcLayout {
  dataSource = new MatTreeNestedDataSource<FtcLayoutMenu>();
  treeControl = new NestedTreeControl<FtcLayoutMenu>((node) => node.children);

  @Input() name: string = "";
  @Input() navbarMenu: FtcLayoutMenu[] = [];
  @Input() fullscreen: BooleanInput;

  // @Output() trigger: EventEmitter<FtcLayoutMenu> =
  //   new EventEmitter<FtcLayoutMenu>();

  constructor(private elementRef: ElementRef) {
    // this.dataSource.data = this.navbarMenu;
    this.treeControl.expansionModel.changed.subscribe((event: any) => {});
  }

  ngOnInit(): void {
    this.dataSource.data = this.navbarMenu;
    this.resizeHeight();
  }

  hasChild = (_: number, node: FtcLayoutMenu) =>
    !!node.children && node.children.length > 0;

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.resizeHeight();
  }

  private resizeHeight(): void {
    const container = this.elementRef.nativeElement
      .parentElement as HTMLElement;
    if (container) {
      container.style.maxHeight = `${window.innerHeight}px`;
    }
  }

  toggleFullScreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
}
