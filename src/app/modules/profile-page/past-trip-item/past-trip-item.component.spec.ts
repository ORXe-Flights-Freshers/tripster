import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTripItemComponent } from './past-trip-item.component';

describe('PastTripItemComponent', () => {
  let component: PastTripItemComponent;
  let fixture: ComponentFixture<PastTripItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTripItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTripItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
