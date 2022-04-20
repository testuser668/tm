import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDuneComponent } from './edit-dune.component';

describe('EditDuneComponent', () => {
  let component: EditDuneComponent;
  let fixture: ComponentFixture<EditDuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
