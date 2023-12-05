import { NgModule } from "@angular/core";
import { MatCommonModule } from "@angular/material/core";
import { A11yModule } from "@angular/cdk/a11y";
import { FtcLayout } from "./layout/layout";

@NgModule({
  imports: [A11yModule, MatCommonModule, FtcLayout],
  exports: [MatCommonModule, FtcLayout],
})
export class FtcLayoutModule {}
