import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuneComponent } from './dune.component';

describe('DuneComponent', () => {
  let component: DuneComponent;
  let fixture: ComponentFixture<DuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
