import { Component, OnInit, Input, ElementRef } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatTreeModule } from "@angular/material/tree";
import { RouterOutlet, RouterModule } from "@angular/router";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { MatMenuModule } from "@angular/material/menu";

import { NestedTreeControl } from "@angular/cdk/tree";

export interface FtcLayoutMenu {
  label: string;
  route?: string;
  children?: FtcLayoutMenu[];
  cssClass?: string;
  icon?: string;
  action?: string;
}

@Component({
  selector: "ftc-sidemenu",
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTreeModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: "./sidemenu.component.html",
  styleUrl: "./sidemenu.component.scss",
})
export class SidemenuComponent implements OnInit {
  dataSource = new MatTreeNestedDataSource<FtcLayoutMenu>();
  treeControl = new NestedTreeControl<FtcLayoutMenu>((node) => node.children);

  @Input() name: string = "";
  @Input() navbarMenu: FtcLayoutMenu[] = [
    {
      label: "Get Started",
      route: "/pages/get-started",
      icon: "apps",
    },
    {
      label: "Material",
      children: [
        { label: "Layout", route: "/pages/material/layout-doc", icon: "apps" },
        {
          label: "Notification",
          route: "/pages/material/notification-doc",
          icon: "notifications",
        },
        { label: "Table", route: "/pages/material/table-doc", icon: "apps" },
        { label: "Action Menu", route: "/pages/material/action-menu-doc", icon: "apps" },
        { label: "Dialog", route: "/pages/material/dialog-doc", icon: "apps" },
        { label: "JsonForm", route: "/pages/material/json-form-doc", icon: "apps" },
      ],
    },
    {
      label: "Cdk",
      children: [
        { label: "Show", route: "/pages/cdk/show-doc", icon: "apps" },
        { label: "Hide", route: "/pages/cdk/hide-doc", icon: "apps" },
      ],
    },
  ];

  constructor(private elementRef: ElementRef) {
    this.treeControl.expansionModel.changed.subscribe((event) => {
      console.log(event);
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.navbarMenu;
  }

  hasChild = (_: number, node: FtcLayoutMenu) =>
    !!node.children && node.children.length > 0;
}
