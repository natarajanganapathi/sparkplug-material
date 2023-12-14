import { OnDestroy, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class DirectiveBase implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Injectable()
export class ComponentBase implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
