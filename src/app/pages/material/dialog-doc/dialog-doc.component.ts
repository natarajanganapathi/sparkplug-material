import { Component } from "@angular/core";
import {
  MatDialogModule,
  MatDialog
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import {
  FtcYesNoDialog,
  FtcYesNoDialogMessage,
} from "@freshthought/material/dialog";

@Component({
  selector: "ftc-dialog-doc",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: "./dialog-doc.component.html",
  styleUrl: "./dialog-doc.component.scss",
})
export class DialogDocComponent {
  message: FtcYesNoDialogMessage = {
    title: "Confirmation",
    message: "Do you want to delete the record?",
  };
  constructor(private _dialog: MatDialog) {}

  open() {
    this._dialog
      .open(FtcYesNoDialog, { data: this.message })
      .afterClosed()
      .subscribe((result) => {
        console.log(result);
      });
  }
}
