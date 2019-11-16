import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddAttractionDetailsComponent} from './add-attraction-details.component';

describe('AddAttractionDetailsComponent', () => {
  let component: AddAttractionDetailsComponent;
  let fixture: ComponentFixture<AddAttractionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAttractionDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttractionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
