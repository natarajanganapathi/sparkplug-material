import { Routes } from "@angular/router";
import { LayoutDocComponent } from "./pages/layout-doc/layout-doc.component";
import { GetStartedComponent } from "./pages/get-started/get-started.component";

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
      { path: "layout-doc", component: LayoutDocComponent },
    ],
  },
  { path: "**", redirectTo: "pages" },
];
