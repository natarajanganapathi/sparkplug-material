import { Directive } from "@angular/core";
import { DirectiveBase } from "@freshthought/cdk/platform";

@Directive({
  selector: "[ftcTable]",
  standalone: true,
})
export class FtcTable extends DirectiveBase {
  constructor() {
    super();
  }
}
