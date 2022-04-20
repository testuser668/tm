import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarsComponent } from './add-mars.component';

describe('AddMarsComponent', () => {
  let component: AddMarsComponent;
  let fixture: ComponentFixture<AddMarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
