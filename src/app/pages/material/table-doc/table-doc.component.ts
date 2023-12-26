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
    columnDefs: [
      { field: "id", header: "Id", sort: true, order: 1 },
      { field: "name", header: "Name", order: 2 },
      { field: "age", header: "Age", order: 3 },
      { field: "place", header: "Place", order: 3 },
      { field: "action", header: "Action" },
    ],
    data: [
      { id: 1, name: "Natarajan", age: 38, place: "Namakkal" },
      { id: 2, name: "Rajasekaran", age: 38, place: "Namakkal" },
      { id: 3, name: "Manikandan", age: 38, place: "Namakkal" },
      { id: 4, name: "Sahas", age: 38, place: "Namakkal" },
      { id: 5, name: "Navrith Saai", age: 38, place: "Namakkal" },
      { id: 6, name: "Ganapathi", age: 38, place: "Namakkal" },
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
