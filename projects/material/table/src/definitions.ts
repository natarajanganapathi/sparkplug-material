import { ComponentType } from "@angular/cdk/portal";

export declare type FtcCellDef = {
  field: string;
  value?: string | object;
  column: FtcColumnDef;
};

export declare type FtcColumnDef = {
  field: string;
  header?: string;
  headerStyle?: object;
  cellStyle?: object;
  order?: number;
  sort?: boolean;
  sticky?: boolean;
  stickyEnd?: boolean;
  
  component?: ComponentType<any>;
};

// export declare type FtcTableDef<T> = {
//   caption?: string;
//   columnDefs: FtcColumnDef[];
//   data: T[];
//   header?: boolean;
//   footer?: boolean;
//   context?: Record<
//     string,
//     (columnDef: FtcColumnDef, data: T) => Record<string, unknown>
//   >;
// };

export class FtcTableDef<T> {
  caption?: string;
  columnDefs: FtcColumnDef[];
  data: T[];
  header?: boolean;
  footer?: boolean;
  context!: Record<
    string,
    (columnDef: FtcColumnDef, data: T) => Record<string, unknown>
  >;
  constructor(caption?: string, columnDef?: FtcColumnDef[], data?: T[]) {
    this.caption = caption;
    this.columnDefs = columnDef ?? [];
    this.data = data ?? [];
    this.context = {};
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
  setContext(
    name: string,
    func: (columnDef: FtcColumnDef, data: T) => Record<string, unknown>
  ) {
    this.context[name] = func;
    return this;
  }
}
