import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dummy-attraction',
  templateUrl: './dummy-attraction.component.html',
  styleUrls: ['./dummy-attraction.component.css']
})
export class DummyAttractionComponent implements OnInit {

  constructor(private changeDetectRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  tp(){
    console.log('clicked');
    this.changeDetectRef.detectChanges();
  }
}
