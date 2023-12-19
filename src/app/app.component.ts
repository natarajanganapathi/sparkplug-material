import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { FtcLayout } from "@freshthought/material/layout";
import { FtcHide, FtcShow } from "@freshthought/cdk/device";

import { SidemenuComponent } from "./common/sidemenu.component";
import { LayoutDocComponent } from "./pages/material/layout-doc/layout-doc.component";

@Component({
  selector: "ftc-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SidemenuComponent,
    FtcLayout,
    FtcHide,
    FtcShow,
    LayoutDocComponent,
  ],
  templateUrl: "app.component.html",
  styleUrl: "app.component.scss",
})
export class AppComponent {}
