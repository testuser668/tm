import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDuneComponent } from './add-dune.component';

describe('DuneformComponent', () => {
  let component: AddDuneComponent;
  let fixture: ComponentFixture<AddDuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
