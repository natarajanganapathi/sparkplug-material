import { ComponentType } from "@angular/cdk/portal";
import { SortDirection } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";

export declare type FtcCellDef = {
  column: FtcColumnDef;
  value?: string | object;
};

export declare type FtcColumnDef = {
  field: string;
  header?: string;
  headerStyle?: { [klass: string]: any };
  cellStyle?: { [klass: string]: any };
  order?: number;
  sort?: boolean;
  sticky?: boolean;
  stickyEnd?: boolean;
  component?: ComponentType<any>;
  componentInput?(column: FtcColumnDef, data: any): any;
};

export declare type FtcPageContext = {
  page?: PageEvent;
  pageSizeOptions: number[];
};

export class FtcTableDef<T> {
  caption?: string;
  columnDefs: FtcColumnDef[];
  data: T[];
  header?: boolean;
  footer?: boolean;
  pageContext?: FtcPageContext;
  constructor(
    caption?: string,
    columnDef?: FtcColumnDef[],
    data?: T[],
    pageContext?: FtcPageContext
  ) {
    this.caption = caption;
    this.columnDefs = columnDef ?? [];
    this.data = data ?? [];
    this.pageContext = pageContext;
  }
  setCaption(caption: string) {
    this.caption = caption;
    return this;
  }
  setColumnDef(columnDef: FtcColumnDef[]) {
    this.columnDefs = columnDef;
    return this;
  }
  setData(data: T[]) {
    this.data = data;
    return this;
  }
  setPageContext(context: FtcPageContext) {
    this.pageContext = context;
    return this;
  }
}

export declare type FtcTableStateChangeEvent = {
  active: string;
  direction: SortDirection;
  pageIndex: number;
  pageSize: number;
  length: number;
};
