import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FtcTable, FtcTableDef } from "@freshthought/material/table";

@Component({
  selector: "ftc-table-doc",
  standalone: true,
  imports: [
    FtcTable,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: "./table-doc.component.html",
  styleUrl: "./table-doc.component.scss",
})
export class TableDocComponent {
  tableOption: FtcTableDef<object> = {
    // caption: "Demo Table",
    expandComponant: FtcTable<object>,
    columnDefs: [
      { field: "id", header: "Id", sort: true, order: 1 },
      { field: "name", header: "Name", order: 2 },
      { field: "age", header: "Age", order: 3 },
      { field: "place", header: "Place", order: 3 },
      { field: "isAdmin", header: "Admin", order: 3 },
      { field: "action", header: "Action", sort: false, stickyEnd: true },
    ],
    data: [
      { id: 1, name: "Natarajan", age: 38, place: "Namakkal", isAdmin: true },
      { id: 2, name: "Rajasekaran", age: 40, place: "Chennai", isAdmin: false },
      { id: 3, name: "Manikandan", age: 36, place: "Namakkal", isAdmin: false },
      { id: 4, name: "Sahas", age: 2, place: "Namakkal", isAdmin: true },
      { id: 5, name: "Navrith Saai", age: 1, place: "Chennai", isAdmin: true },
      { id: 6, name: "Ganapathi", age: 68, place: "Namakkal", isAdmin: false },
    ],
  };
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
