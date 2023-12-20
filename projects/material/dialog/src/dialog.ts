import { Component, Inject } from "@angular/core";
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ComponentBase } from "@freshthought/cdk/platform";

export declare type FtcYesNoDialogMessage = {
  title: string;
  message: string;
};

@Component({
  selector: "ftc-yes-no-dialog",
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatButtonModule],
  templateUrl: "./dialog.html",
  styleUrl: "./dialog.scss",
  providers: [],
})
export class FtcYesNoDialog extends ComponentBase {
  constructor(
    private dialogRef: MatDialogRef<FtcYesNoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FtcYesNoDialogMessage
  ) {
    super();
  }
  close() {
    this.dialogRef.close(false);
  }
}
