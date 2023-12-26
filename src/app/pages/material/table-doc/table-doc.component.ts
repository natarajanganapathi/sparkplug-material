import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { FtcTable, FtcTableOption } from "@freshthought/material/table";

@Component({
  selector: "ftc-table-doc",
  standalone: true,
  imports: [FtcTable, MatTableModule],
  templateUrl: "./table-doc.component.html",
  styleUrl: "./table-doc.component.scss",
})
export class TableDocComponent {
  tableOption: FtcTableOption<object> = {
    // caption: "Demo Table",
    columns: [
      { columnDef: "id", header: "Id", sort: true, order: 1 },
      { columnDef: "name", header: "Name", order: 2 },
      { columnDef: "age", header: "Age", order: 3 },
      { columnDef: "place", header: "Place", order: 3 },
    ],
    data: [
      { id: 1, name: "Natarajan", age: 38, place: 'Namakkal' },
      { id: 2, name: "Rajasekaran" },
      { id: 3, name: "Manikandan" },
      { id: 4, name: "Sahas" },
      { id: 5, name: "Navrith Saai" },
      { id: 6, name: "Ganapathi" },
    ],
  };
  onRowClick(event: object) {
    console.log(event);
  }
  onSortChange(event: object) {
    console.log(event);
  }
}
