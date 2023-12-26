import {
  Component,
  Input,
  Output,
  OnInit,
  AfterViewInit,
  EventEmitter,
  ViewChild,
  signal,
  WritableSignal,
  TemplateRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { ComponentBase, FtcAttr } from "@freshthought/cdk/platform";

export declare type FtcCellDef = {
  header?: string;
  field: string;
  value: string | object;
};

export declare type FtcColumnDef = {
  field: string;
  header?: string;
  order?: number;
  sort?: boolean;
  sticky?: boolean;
  stickyEnd?: boolean;
};

export declare type FtcTableDef<T> = {
  caption?: string;
  columnDefs: FtcColumnDef[];
  data: T[];
  header?: boolean;
  footer?: boolean;
};

@Component({
  selector: "ftc-table",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    CdkDropList,
    CdkDrag,
    FtcAttr,
  ],
  templateUrl: "./table.html",
  styleUrl: "./table.scss",
})
export class FtcTable<T>
  extends ComponentBase
  implements OnInit, AfterViewInit
{
  @Input() tableOption: FtcTableDef<T> = { columnDefs: [], data: [] };
  @Input() cellTemplate!: TemplateRef<object>;

  @Output() rowClick = new EventEmitter<T>();
  @Output() sortChange = new EventEmitter<object>();

  dataSource!: MatTableDataSource<T>;
  displayColumns: WritableSignal<string[]> = signal([]);
  sortEnabled: WritableSignal<boolean> = signal(false);
  selection = new SelectionModel<T>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  context = {
    tableOption: this.tableOption,
    displayColumns: this.displayColumns,
  };
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<T>(this.tableOption.data);
    this.displayColumns.set(
      this.getDesplayColumns(this.tableOption.columnDefs)
    );
    this.sortEnabled.set(this.tableOption.columnDefs.some((x) => x.sort));
    this.context = {
      tableOption: this.tableOption,
      displayColumns: this.displayColumns,
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  drop(data: object) {
    const event: CdkDragDrop<string[]> = data as CdkDragDrop<string[]>;
    moveItemInArray(
      this.displayColumns(),
      event.previousIndex,
      event.currentIndex
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDesplayColumns(columns: FtcColumnDef[]): string[] {
    return ["select", ...columns.map((x) => x.field)];
  }
  addColumn(option: FtcColumnDef) {
    const updatedColumns = [...this.tableOption.columnDefs, option];
    const sortedColumns = this.sortColumnsByOrder(updatedColumns);
    this.updateColumns(sortedColumns);
  }
  removeColumn(option: FtcColumnDef) {
    const updatedColumns = this.tableOption.columnDefs.filter(
      (x) => x.field !== option.field
    );
    this.updateColumns(updatedColumns);
  }
  sortColumnsByOrder(columns: FtcColumnDef[]): FtcColumnDef[] {
    return columns.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  updateColumns(columns: FtcColumnDef[]) {
    this.tableOption.columnDefs = columns;
    this.displayColumns.set(this.getDesplayColumns(columns));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row `;
  }
  getCellDef(
    value: string | object,
    field: string,
    header?: string
  ): FtcCellDef {
    return { value, field, header };
  }
}
