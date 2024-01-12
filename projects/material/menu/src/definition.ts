import { QueryParamsHandling } from "@angular/router";

export declare type FtcMenuOption = {
  label: string;
  route?: string;
  cssClass?: string;
  icon?: string;
  action?: string;
  children?: FtcMenuOption[];
};

export interface FtcMenuItem {
  label?: string;
  icon?: string;
  command?(event: FtcMenuItemCommandEvent): void;
  url?: string;
  items?: FtcMenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
//   escape?: boolean;
  routerLinkActiveOptions?: any;
  separator?: boolean;
  badge?: string;
//   tooltip?: string;
  tooltipPosition?: string;
  badgeStyleClass?: string;
  style?: { [klass: string]: any } | null;
  styleClass?: string;
  title?: string;
//   id?: string;
  automationId?: any;
  tabindex?: string;
  routerLink?: any;
  queryParams?: { [k: string]: any };
  fragment?: string;
  queryParamsHandling?: QueryParamsHandling;
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  iconStyle?: { [klass: string]: any } | null;
  iconClass?: string;
  state?: { [k: string]: any };
  //   tooltipOptions?: TooltipOptions;
  [key: string]: any;
}

export interface FtcMenuItemCommandEvent {
  originalEvent?: Event;
  item?: FtcMenuItem;
  index?: number;
}
