import { Component, inject } from "@angular/core";
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
  result: boolean;
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
  templateUrl: "./yes-no-dialog.html",
  styleUrl: "./yes-no-dialog.scss",
  providers: [],
})
export class FtcYesNoDialog extends ComponentBase {
  dialogRef = inject(MatDialogRef<FtcYesNoDialog>);
  dialog: FtcYesNoDialogInput = inject(MAT_DIALOG_DATA);
  close() {
    this.dialogRef.close();
  }
}
