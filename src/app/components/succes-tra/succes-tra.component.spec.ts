import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesTraComponent } from './succes-tra.component';

describe('SuccesTraComponent', () => {
  let component: SuccesTraComponent;
  let fixture: ComponentFixture<SuccesTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesTraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
