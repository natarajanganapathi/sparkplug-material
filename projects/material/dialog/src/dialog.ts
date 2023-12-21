import { Component, Inject } from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ComponentBase } from "@freshthought/cdk/platform";
import {
  FtcDialogInput,
  FtcDialogData,
  FtcDialogResult,
} from "@freshthought/cdk/dialog";

export declare type FtcYesNoDialogData = FtcDialogData & {
  header: string;
  message: string;
};

export declare type FtcYesNoDialogResult = FtcDialogResult & {
  confirmed: boolean;
};

export declare type FtcYesNoDialogInput = FtcDialogInput<
  ComponentType<FtcYesNoDialog>
> & {
  align?: "start" | "center" | "end";
  data: FtcYesNoDialogData;
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
    @Inject(MAT_DIALOG_DATA) public dialog: FtcYesNoDialogInput
  ) {
    super();
  }
  close() {
    this.dialogRef.close();
  }
}
