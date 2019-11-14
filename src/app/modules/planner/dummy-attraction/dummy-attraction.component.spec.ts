import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyAttractionComponent } from './dummy-attraction.component';

describe('DummyAttractionComponent', () => {
  let component: DummyAttractionComponent;
  let fixture: ComponentFixture<DummyAttractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyAttractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
