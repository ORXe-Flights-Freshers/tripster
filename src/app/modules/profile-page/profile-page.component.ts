import { NavigatorService } from '@services/navigator.service';
import { HeaderDataService } from '@services/HeaderData/header-data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private headerDataService: HeaderDataService,
    public navigatorService: NavigatorService) {
    this.headerDataService.customizeHeaderForProfilePage();
   }

  ngOnInit() {
  }

}
