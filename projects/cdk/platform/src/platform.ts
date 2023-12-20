import { OnDestroy, Directive } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class DirectiveBase implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

@Directive()
export abstract class ComponentBase implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

// export function Destroyable(target: any) {
//   const Destory = class {
//     protected readonly destroyed$ = new Subject<void>();
//     ngOnDestroy(): void {
//       this.destroyed$.next();
//       this.destroyed$.complete();
//     }
//   };
//   Object.assign(target.prototype, new Destory());
// }
