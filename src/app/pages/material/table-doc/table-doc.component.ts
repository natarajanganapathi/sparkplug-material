import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule, MatCheckbox } from "@angular/material/checkbox";
import {
  FtcColumnDef,
  FtcTable,
  FtcTableDef,
} from "@freshthought/material/table";

@Component({
  selector: "ftc-table-doc",
  standalone: true,
  imports: [
    FtcTable,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: "./table-doc.component.html",
  styleUrl: "./table-doc.component.scss",
})
export class TableDocComponent {
  columnDefs = [
    {
      field: "id",
      header: "Id",
      sort: true,
      order: 6,
      style: { width: "160px" },
    },
    {
      field: "name",
      header: "Name",
      sort: true,
      order: 2,
      style: { width: "160px" },
    },
    {
      field: "age",
      header: "Age",
      order: 3,
      style: { width: "160px" },
    },
    {
      field: "place",
      header: "Place",
      order: 4,
      style: { width: "160px" },
    },
    {
      field: "isAdmin",
      header: "Admin",
      order: 5,
      style: { width: "360px" },
      component: MatCheckbox,
    },
  ];
  data = [
    { id: 1, name: "Natarajan", age: 38, place: "Namakkal", isAdmin: true },
    { id: 2, name: "Rajasekaran", age: 40, place: "Chennai", isAdmin: false },
    { id: 3, name: "Manikandan", age: 36, place: "Namakkal", isAdmin: false },
    { id: 4, name: "Sahas", age: 2, place: "Namakkal", isAdmin: true },
    { id: 5, name: "Navrith Saai", age: 1, place: "Chennai", isAdmin: true },
    { id: 6, name: "Ganapathi", age: 68, place: "Namakkal", isAdmin: false },
  ];
  tableConfig: FtcTableDef<object>;
  constructor() {
    this.tableConfig = new FtcTableDef<object>()
      .setCaption("Demo Table")
      .setColumnDef(this.columnDefs)
      .setData(this.data)
      .setContext("isAdminInput", (columnDef: FtcColumnDef, data: any) => {
        return { checked: data.isAdmin };
      });
  }
  onRowClick(event: object) {
    console.log(event);
  }
  onSortChange(event: object) {
    console.log(event);
  }
  alerts(message: string) {
    alert(message);
  }
}
