import {SharedModule} from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { Routes, RouterModule } from '@angular/router';
import { PastTripsComponent } from './past-trips/past-trips.component';
import { PastTripItemComponent } from './past-trip-item/past-trip-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppMaterialModule } from '../app-material/app-material.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent
  }
];

@NgModule({
  declarations: [ProfilePageComponent, PastTripsComponent, PastTripItemComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AppMaterialModule
  ]
})
export class ProfilePageModule { }
