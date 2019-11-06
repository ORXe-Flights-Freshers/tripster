import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'src/app/models/Trip';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import {HeaderDataService} from '../../../services/HeaderData/header-data.service';
import { AddHotelDetailsComponent } from '../add-hotel-details/add-hotel-details.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  activeTab: string;

  constructor(
    public route: ActivatedRoute,
    public tripService: TripService,
    private http: HttpClient,
    public dialog: MatDialog,
    private headerLinks: HeaderDataService) {
    this.headerLinks.customizeHeaderForPlannerPage();
  }

  onClick() {
    console.log(this.route);
  }

  ngOnInit() {
    // @ts-ignore
    const id = this.route.params.value.id;
    this.http.get('http://3.14.69.62:5000/api/trip/' + id)
      .subscribe(data => {
        this.tripService.trip = data as Trip;
        this.tripService.tripSubject.next(this.tripService.trip);
      });
    this.activeTab = 'timeline';
  }

  closeHotelDialog() {
    this.dialog.closeAll();
  }

  openHotelDialog(hotelParentData): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '510px';

    dialogConfig.data = hotelParentData;
    const dialogRef = this.dialog.open(AddHotelDetailsComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(placeFromDialog => {
        console.log(placeFromDialog);
        if (placeFromDialog) {}
      });
  }
}
