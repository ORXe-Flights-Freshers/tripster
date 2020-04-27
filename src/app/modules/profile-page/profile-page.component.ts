import { NavigatorService } from '@services/navigator.service';
import { HeaderDataService } from '@services/HeaderData/header-data.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    private headerDataService: HeaderDataService,
    public navigatorService: NavigatorService,
    public loginService: LoginService) {
    this.headerDataService.customizeHeaderForProfilePage();
   }

  ngOnInit() {
    this.loginService.setPastTrips();
  }

}
