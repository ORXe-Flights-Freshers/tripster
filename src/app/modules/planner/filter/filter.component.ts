import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  attractionType = 'tourist_attraction';
  attractionTypes: string[] = [
    'tourist_attraction',
    'place_of_worship',
    'amusement_park',
     'art_gallery',
     'church',
     'hindu_temple',
     'mosque',
     'museum',
     'night_club',
     'shopping_mall',
     'spa',
     'zoo'];
  constructor(private dialogRef: MatDialogRef<FilterComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.attractionType = data.attractionType;
  }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close();
  }
  addFilter() {
    this.dialogRef.close(this.attractionType);
  }
  setAttractionType(event: MatSelectChange) {
    this.attractionType = event.value;
  }

}
