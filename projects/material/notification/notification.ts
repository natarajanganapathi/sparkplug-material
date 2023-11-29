import {
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from "@angular/core";

export interface SpcNotificationConfig {
  showProfile?: boolean;
}

export const SPC_LAYOUT_CONFIG = new InjectionToken<SpcNotificationConfig>(
  "SPC_NOTIFICATION_CONFIG"
);

@Component({
  selector: "spc-layout",
  template: "<div>Notification</div>",
  styleUrls: [],
  exportAs: "spcNotification",
  standalone: true,
})
export class SpcNotification {
  @Input() showProfile: boolean;

  constructor(@Inject(SPC_LAYOUT_CONFIG) @Optional() config?: SpcNotificationConfig) {
    this.showProfile = config?.showProfile ?? false;
  }
}
