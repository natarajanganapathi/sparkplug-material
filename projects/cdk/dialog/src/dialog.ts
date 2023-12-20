import {
  Injectable,
  TemplateRef,
  EventEmitter,
  Optional,
  Inject,
} from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { takeUntil } from "rxjs";
import { DirectiveBase } from "@freshthought/cdk/platform";

@Injectable({ providedIn: "root" })
export class FtcDialog extends DirectiveBase {
  closed = new EventEmitter<any>();
  opened = new EventEmitter<void>();
  constructor(
    private _dialog: MatDialog,
    @Optional()
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS)
    private _defaultOptions: MatDialogConfig
  ) {
    super();
  }

  open<T>(
    element: ComponentType<T> | TemplateRef<T>,
    config: MatDialogConfig = this._defaultOptions
  ): MatDialogRef<T> {
    config = config || this._defaultOptions;
    const ref = this._dialog.open<T>(element, config);
    ref
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => this.closed.emit(result));
    this.opened.emit();
    return ref;
  }
  close(): void {
    this._dialog.closeAll();
  }
}
