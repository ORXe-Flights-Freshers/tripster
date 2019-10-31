import { Component, OnInit } from '@angular/core';
import {HeaderLinksService} from '../../services/HeaderLinks/header-links.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private headerLinks: HeaderLinksService) {
    this.headerLinks.generateLinksForHomePage();
  }

  ngOnInit() {
  }

}
