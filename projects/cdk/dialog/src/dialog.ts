import { Directive, TemplateRef, Output, EventEmitter } from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DirectiveBase } from "@freshthought/cdk/platform";

export declare type DialogResult = {
  event: string;
  data: any;
};

@Directive()
export class FtcDialog extends DirectiveBase {
  @Output() closed = new EventEmitter<DialogResult>();
  @Output() opened = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {
    super();
  }

  open<T>(
    element: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig
  ): void {
    this.dialog
      .open<T>(element, config)
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        this.closed.emit(result);
      });
    this.opened.emit();
  }
  close(): void {
    this.dialog.closeAll();
  }
}
