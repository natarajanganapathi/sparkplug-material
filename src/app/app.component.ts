import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FtcLayout } from "@freshthought/material/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { SidemenuComponent } from "./common/sidemenu.component";
import { LayoutDocComponent } from "./pages/layout-doc/layout-doc.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    FtcLayout,
    MatButtonModule,
    SidemenuComponent,
    LayoutDocComponent
  ],
  templateUrl: "app.component.html",
  styleUrl: "app.component.scss",
})
export class AppComponent {
}
