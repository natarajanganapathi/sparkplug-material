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
  Injector,
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { ComponentBase, FtcAttr } from "@freshthought/cdk/platform";
import { BooleanInput } from "@angular/cdk/coercion";
import { FtcTableDef, FtcColumnDef, FtcCellDef } from "./definitions";

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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    FtcAttr,
  ],
  templateUrl: "./table.html",
  styleUrl: "./table.scss",
  animations: [
    trigger("detailExpand", [
      state("collapsed,void", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class FtcTable<T>
  extends ComponentBase
  implements OnInit, AfterViewInit
{
  @Input() tableOption!: FtcTableDef<T>;

  @Input() headerCellTemplate!: TemplateRef<any>;
  @Input() actionCellTemplate!: TemplateRef<any>;

  @Input() valueCellTemplate!: TemplateRef<any>;
  @Input() valueCellTemplateInjector!: Injector;

  @Input() expandCellTemplate!: TemplateRef<any>;
  @Input() expandCellTemplateInjector!: Injector;

  @Input() multiSelect: BooleanInput = false;

  @Output() rowClick = new EventEmitter<T>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() pageChange = new EventEmitter<PageEvent>();

  dataSource!: MatTableDataSource<T>;
  displayColumns: WritableSignal<string[]> = signal([]);

  sortEnabled: WritableSignal<boolean> = signal(false);
  selection = new SelectionModel<T>(true, []);
  expandedElement!: T;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<T>(this.tableOption.data);
    this.displayColumns.set(this.getAllColumnName(this.tableOption.columnDefs));
    this.sortEnabled.set(this.tableOption.columnDefs.some((x) => x.sort));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  drop(data: object) {
    const event = data as CdkDragDrop<string[]>;
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

  getAllColumnName(columns: FtcColumnDef[]): string[] {
    const columnNames = columns.map(({ field }) => field);
    if (this.multiSelect) {
      columnNames.unshift("multiSelect");
    }
    if (this.actionCellTemplate || this.expandCellTemplate) {
      columnNames.push("actions");
    }
    return columnNames;
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
    this.displayColumns.set(this.getAllColumnName(columns));
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
    column: FtcColumnDef
  ): FtcCellDef {
    return { value, field, column };
  }
  getCellInput(name: string, column: FtcColumnDef, data: T) {
    if (!this.tableOption.context[name]) {
      throw new Error(`${name} is not registered in context`);
    }
    const value = this.tableOption.context[name](column, data);
    return { ...value, disabled: true };
  }
  expand(row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }
}
