import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormDocComponent } from './json-form-doc.component';

describe('JsonFormDocComponent', () => {
  let component: JsonFormDocComponent;
  let fixture: ComponentFixture<JsonFormDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonFormDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonFormDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
