import {
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from "@angular/core";

export interface SpcLayoutConfig {
  showProfile?: boolean;
}

export const SPC_LAYOUT_CONFIG = new InjectionToken<SpcLayoutConfig>(
  "SPC_LAYOUT_CONFIG"
);

@Component({
  selector: "spc-layout",
  templateUrl: "layout.html",
  styleUrls: ["layout.scss"],
  exportAs: "spcLayout",
  standalone: true,
})
export class SpcLayout {
  @Input() showProfile: boolean;

  constructor(@Inject(SPC_LAYOUT_CONFIG) @Optional() config?: SpcLayoutConfig) {
    this.showProfile = config?.showProfile ?? false;
  }
}
