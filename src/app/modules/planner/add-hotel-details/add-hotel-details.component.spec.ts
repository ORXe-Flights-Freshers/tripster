import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddHotelDetailsComponent} from './add-hotel-details.component';

describe('AddHotelDetailsComponent', () => {
  let component: AddHotelDetailsComponent;
  let fixture: ComponentFixture<AddHotelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddHotelDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
