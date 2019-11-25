import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTripComponent } from './popular-trip.component';

describe('PopularTripComponent', () => {
  let component: PopularTripComponent;
  let fixture: ComponentFixture<PopularTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
