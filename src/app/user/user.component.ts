import { Component, Input, ElementRef } from '@angular/core';

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
  selector: 'ftc-user',
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
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  dataSource = new MatTreeNestedDataSource<FtcLayoutMenu>();
  treeControl = new NestedTreeControl<FtcLayoutMenu>((node) => node.children);

  @Input() name: string = "";
  @Input() navbarMenu: FtcLayoutMenu[] = [];

  constructor(private elementRef: ElementRef) {
    // this.dataSource.data = this.navbarMenu;
    this.treeControl.expansionModel.changed.subscribe((event: any) => {});
  }

  ngOnInit(): void {
    this.dataSource.data = this.navbarMenu;
  }

  hasChild = (_: number, node: FtcLayoutMenu) =>
    !!node.children && node.children.length > 0;

}
