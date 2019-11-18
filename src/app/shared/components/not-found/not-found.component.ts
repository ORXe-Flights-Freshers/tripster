import {Component, OnInit} from '@angular/core';
import {HeaderDataService} from '../../../services/HeaderData/header-data.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private headerDataService: HeaderDataService) {
    this.headerDataService.customizeHeaderForNotFoundPage();
  }

  ngOnInit() {
  }

}
