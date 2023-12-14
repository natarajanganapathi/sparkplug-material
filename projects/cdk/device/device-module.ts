import { NgModule } from "@angular/core";

import { FtcShow } from "./show/show";
import { FtcHide } from "./hide/hide";

@NgModule({
  imports: [FtcShow, FtcHide],
  exports: [FtcShow, FtcHide],
})
export class DeviceModule {}
