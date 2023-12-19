import { Component } from "@angular/core";
import { FtcYesNoDialog } from "@freshthought/material/dialog";

@Component({
  selector: "ftc-dialog-doc",
  standalone: true,
  imports: [FtcYesNoDialog],
  templateUrl: "./dialog-doc.component.html",
  styleUrl: "./dialog-doc.component.scss",
})
export class DialogDocComponent {}
