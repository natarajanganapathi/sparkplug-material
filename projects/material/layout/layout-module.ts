import { NgModule } from "@angular/core";
import { MatCommonModule } from "@angular/material/core";
import { A11yModule } from "@angular/cdk/a11y";
import { SpcLayout } from "./layout/layout";

@NgModule({
  imports: [A11yModule, MatCommonModule, SpcLayout],
  exports: [SpcLayout, MatCommonModule],
})
export class SpcLayoutModule {}
