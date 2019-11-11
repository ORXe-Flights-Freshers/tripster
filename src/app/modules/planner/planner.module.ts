import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PlannerComponent } from './planner/planner.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AddStopComponent } from './add-stop/add-stop.component';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { HotelCardListComponent } from './hotel-card-list/hotel-card-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AddHotelDetailsComponent } from './add-hotel-details/add-hotel-details.component';
import { AttractionCardListComponent } from './attraction-card-list/attraction-card-list.component';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddAttractionDetailsComponent } from './add-attraction-details/add-attraction-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: PlannerComponent
  },
  {
    path: 'add',
    component: AddStopComponent
  }
];

@NgModule({
  declarations: [
    PlannerComponent,
    MapComponent,
    TimelineComponent,
    AddStopComponent,
    HotelCardComponent,
    HotelCardListComponent,
    AttractionCardComponent,
    AttractionCardListComponent,
    AddHotelDetailsComponent,
    ExpensesComponent,
    AddAttractionDetailsComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2LnC7a1z5MDzBjx4Us9qo9Z4Yupum03A',
      libraries: ['places']
    }),
    AgmDirectionModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    AgmDirectionModule,
    AppMaterialModule,
    AgmCoreModule,
    MatIconModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  exports: [AddStopComponent, AddHotelDetailsComponent, AddAttractionDetailsComponent],
  entryComponents: [AddHotelDetailsComponent, AddAttractionDetailsComponent]
})
export class PlannerModule {}
