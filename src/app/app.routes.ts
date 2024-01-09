import { Routes } from "@angular/router";
import { LayoutDocComponent } from "./pages/material/layout-doc/layout-doc.component";
import { GetStartedComponent } from "./pages/get-started/get-started.component";
import { TableDocComponent } from "./pages/material/table-doc/table-doc.component";
import { DialogDocComponent } from "./pages/material/dialog-doc/dialog-doc.component";
import { NotificationDocComponent } from "./pages/material/notification-doc/notification-doc.component";
import { JsonFormDocComponent } from "./pages/material/json-form-doc/json-form-doc.component";
import { MenuDocComponent } from "./pages/material/menu-doc/menu-doc.component";

import { ShowDocComponent } from "./pages/cdk/show-doc/show-doc.component";
import { HideDocComponent } from "./pages/cdk/hide-doc/hide-doc.component";

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./components/layout/layout.module').then(
  //       (m) => m.LayoutModule
  //     ),
  // },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  {
    path: "pages",
    children: [
      { path: "", redirectTo: "get-started", pathMatch: "full" },
      { path: "get-started", component: GetStartedComponent },
      {
        path: "material",
        children: [
          { path: "", redirectTo: "layout-doc", pathMatch: "full" },
          { path: "layout-doc", component: LayoutDocComponent },
          { path: "menu-doc", component: MenuDocComponent },
          { path: "table-doc", component: TableDocComponent },
          { path: "json-form-doc", component: JsonFormDocComponent },
          { path: "notification-doc", component: NotificationDocComponent },
          { path: "dialog-doc", component: DialogDocComponent },
        ],
      },
      {
        path: "cdk",
        children: [
          { path: "", redirectTo: "show-doc", pathMatch: "full" },
          { path: "show-doc", component: ShowDocComponent },
          { path: "hide-doc", component: HideDocComponent },
        ],
      },
    ],
  },
  { path: "**", redirectTo: "pages" },
];
