import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FtcLayout, FtcLayoutMenu } from "@freshthought/material/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { UserComponent } from "./user/user.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    FtcLayout,
    MatButtonModule,
    UserComponent,
  ],
  templateUrl: "app.component.html",
  styleUrl: "app.component.scss",
})
export class AppComponent {
  layoutMenu: FtcLayoutMenu[] = [
    {
      label: "Layout",
      route: "/pages/layout",
      icon: "",
    },
    {
      label: "Notification",
      route: "/pages/notification",
      icon: "",
    },
    {
      label: "MenuDemo",
      children: [
        { label: "Sub Menu 1", route: "/qa1-deployment", icon: "" },
        { label: "Sub Menu 2", route: "/qa2-deployment", icon: "" },
        {
          label: "Sub Menu 3",
          route: "/qa3-deployment",
          icon: "",
          children: [
            { label: "Sub Menu 1", route: "/qa1-deployment", icon: "" },
            { label: "Sub Menu 2", route: "/qa2-deployment", icon: "" },
            { label: "Sub Menu 3", route: "/qa3-deployment", icon: "" },
          ],
        },
      ],
    },
  ];
}
