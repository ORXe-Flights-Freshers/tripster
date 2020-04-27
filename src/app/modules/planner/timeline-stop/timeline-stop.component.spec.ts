import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineStopComponent} from './timeline-stop.component';

describe('TimelineStopComponent', () => {
  let component: TimelineStopComponent;
  let fixture: ComponentFixture<TimelineStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineStopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
