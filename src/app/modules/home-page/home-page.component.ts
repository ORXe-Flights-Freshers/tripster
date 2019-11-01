import { Component, OnInit } from '@angular/core';
import {HeaderDataService} from '../../services/HeaderData/header-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private headerDataService: HeaderDataService) {
    this.headerDataService.customizeHeaderForHomePage();
  }

  ngOnInit() {
  }

}
