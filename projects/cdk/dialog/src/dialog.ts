import {
  Directive,
  Output,
  Input,
  TemplateRef,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DirectiveBase } from "@freshthought/cdk/platform";

export declare type FtcDialogData = object;
export declare type FtcDialogResult = object;

export declare type FtcDialogInput<
  T extends ComponentType<object> | TemplateRef<object>
> = {
  element: T;
  data: FtcDialogData;
};

@Directive({ selector: "[ftcDialog]", standalone: true })
export class FtcDialog extends DirectiveBase {
  @Output() closed: EventEmitter<FtcDialogResult> =
    new EventEmitter<FtcDialogResult>();
  @Output() opened: EventEmitter<FtcDialogData> =
    new EventEmitter<FtcDialogData>();
  @Input() ftcDialog: FtcDialogInput<ComponentType<object>> = {
    element: FtcDialog,
    data: {},
  };
  constructor(private _dialog: MatDialog) {
    super();
  }

  @HostListener("click", ["$event"])
  onClick(event: MouseEvent) {
    this.open(this.ftcDialog.element, {
      data: this.ftcDialog,
    });
    event.preventDefault();
  }

  open<T>(
    element: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig
  ): MatDialogRef<T> {
    const ref = this._dialog.open<T>(element, config);
    ref
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => this.closed.emit(result));
    this.opened.emit(config?.data);
    return ref;
  }
}
