import { NgModule } from "@angular/core";
import { MatCommonModule } from "@angular/material/core";
import { A11yModule } from "@angular/cdk/a11y";
import { FtcNotification } from "./notification";

@NgModule({
  imports: [A11yModule, MatCommonModule, FtcNotification],
  exports: [FtcNotification, MatCommonModule],
})
export class FtcNotificationModule {}
