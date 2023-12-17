import { OnDestroy, Directive } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class DirectiveBase implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Directive()
export abstract class ComponentBase implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
