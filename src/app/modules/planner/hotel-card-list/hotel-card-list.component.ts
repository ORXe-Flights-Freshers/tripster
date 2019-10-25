import { Component, OnInit, Input } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-hotel-card-list",
  templateUrl: "./hotel-card-list.component.html",
  styleUrls: ["./hotel-card-list.component.scss"]
})
export class HotelCardListComponent implements OnInit {
  @Input() numberOfHotels: number = 123;
  arrHotels: object[];
  cities: object[];

  constructor(private httpService: HttpClient) {
    this.httpService.get("./assets/hotels.json").subscribe(
      data => {
        this.arrHotels = data as object[]; // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    this.httpService.get("./assets/cities.json").subscribe(
      data => {
        this.cities = data as object[]; // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  ngOnInit() {}
  hotelByCity(city) {
    this.httpService.get("./assets/" + city + ".json").subscribe(
      data => {
        this.arrHotels = data as object[]; // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
