import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsFilterComponent } from './months-filter.component';

describe('MonthsFilterComponent', () => {
  let component: MonthsFilterComponent;
  let fixture: ComponentFixture<MonthsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
