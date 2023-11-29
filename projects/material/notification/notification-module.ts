import { NgModule } from "@angular/core";
import { MatCommonModule } from "@angular/material/core";
import { A11yModule } from "@angular/cdk/a11y";
import { SpcNotification } from "./notification";

@NgModule({
  imports: [A11yModule, MatCommonModule, SpcNotification],
  exports: [SpcNotification, MatCommonModule],
})
export class SpcNotificationModule {}
