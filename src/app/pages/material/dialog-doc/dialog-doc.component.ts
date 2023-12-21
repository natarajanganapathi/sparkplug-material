import { Component } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import {
  FtcYesNoDialog,
  FtcYesNoDialogData,
  FtcYesNoDialogInput,
  FtcYesNoDialogResult,
} from "@freshthought/material/dialog";

import {
  FtcDialog,
  FtcDialogData,
  FtcDialogResult,
} from "@freshthought/cdk/dialog";

@Component({
  selector: "ftc-dialog-doc",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FtcDialog],
  templateUrl: "./dialog-doc.component.html",
  styleUrl: "./dialog-doc.component.scss",
})
export class DialogDocComponent {
  yesNoDialogData: FtcYesNoDialogInput = {
    element: FtcYesNoDialog,
    data: {
      header: "Confirmation",
      message: "Do you want to delete the record?",
    },
  };
  input = "";
  result = "";
  onOpen(event: FtcDialogData) {
    const data = event as FtcYesNoDialogData;
    this.input = JSON.stringify(data, null, 2);
  }
  onClose(event: FtcDialogResult) {
    const data = event as FtcYesNoDialogResult;
    this.result = JSON.stringify(data, null, 2);
  }
}
