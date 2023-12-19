import {
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from "@angular/core";

export interface FtcNotificationConfig {
  showProfile?: boolean;
}

export const FTC_LAYOUT_CONFIG = new InjectionToken<FtcNotificationConfig>(
  "FTC_NOTIFICATION_CONFIG"
);

@Component({
  selector: "ftc-notification",
  template: "<div>Notification</div>",
  styleUrls: [],
  exportAs: "ftcNotification",
  standalone: true,
})
export class FtcNotification {
  @Input() showProfile: boolean;

  constructor(@Inject(FTC_LAYOUT_CONFIG) @Optional() config?: FtcNotificationConfig) {
    this.showProfile = config?.showProfile ?? false;
  }
}
