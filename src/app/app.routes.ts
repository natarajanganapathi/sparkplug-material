import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";

export const routes: Routes = [
  { path: "", redirectTo: "user", pathMatch: "full" },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./components/layout/layout.module').then(
  //       (m) => m.LayoutModule
  //     ),
  // },
  { path: "user", component: UserComponent },
  { path: "**", redirectTo: "user" },
];
