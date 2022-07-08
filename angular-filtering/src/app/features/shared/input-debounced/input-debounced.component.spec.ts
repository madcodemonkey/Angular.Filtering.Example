import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDebouncedComponent } from './input-debounced.component';

describe('InputDebouncedComponent', () => {
  let component: InputDebouncedComponent;
  let fixture: ComponentFixture<InputDebouncedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDebouncedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDebouncedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
