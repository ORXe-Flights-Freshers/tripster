import {Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appScrollTracker]',
})
  export class ScrollTrackerDirective {
    @Output() endOfScrollReached = new EventEmitter<any>();

    @HostListener('scroll', ['$event'])
    onScroll(event) {
      // do tracking
      // console.log('scrolled', event.target.scrollTop);
      // Listen to click events in the component
      const tracker = event.target;
      const limit = tracker.scrollHeight - tracker.clientHeight;
      if (event.target.scrollTop >= limit - 1) {
        this.endOfScrollReached.emit();
      }
    }
  }
