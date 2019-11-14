import {
  ChangeDetectorRef,
  Component, ElementRef,
  Input, ViewChild
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { Attraction } from '@models/Attraction';
import { TripService } from '@services/trip.service';
import { AddAttractionDetailsComponent } from '../add-attraction-details/add-attraction-details.component';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.css']
})
export class AttractionCardComponent {
  @Input() stopIdOfAttraction: string;
  @Input() attractionData: Attraction;

  @ViewChild('headingDetails', { static: false }) headingDetails: ElementRef;

  constructor(public tripService: TripService,
              public dialog: MatDialog) {}

  openAttractionDialog(attractionData): void {
    console.log(attractionData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    dialogConfig.data = {attractionData, stopIdOfAttraction: this.stopIdOfAttraction} ;
    const dialogRef = this.dialog.open(AddAttractionDetailsComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(placeFromDialog => {
        this.tripService.displayTimeline = false;

        if (placeFromDialog) {
          this.tripService.addAttractionToTrip(placeFromDialog, this.stopIdOfAttraction);
          // this.openSnackBar('Attraction Added Successfully', 'OK');
        }
      });
  }

  onHeadingOver() {
    (this.headingDetails.nativeElement as HTMLDivElement).innerText = this.attractionData.name;
    if (!(this.headingDetails.nativeElement as HTMLDivElement).classList.contains('heading-details')) {
      (this.headingDetails.nativeElement as HTMLDivElement).classList.add('heading-details');
    }
  }

  onHeadingOut() {
    (this.headingDetails.nativeElement as HTMLDivElement).innerText = '';
    if ((this.headingDetails.nativeElement as HTMLDivElement).classList.contains('heading-details')) {
      (this.headingDetails.nativeElement as HTMLDivElement).classList.remove('heading-details');
    }
  }
}
