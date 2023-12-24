import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TableDocComponent } from "./table-doc.component";

describe("TableDocComponent", () => {
  let component: TableDocComponent;
  let fixture: ComponentFixture<TableDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
