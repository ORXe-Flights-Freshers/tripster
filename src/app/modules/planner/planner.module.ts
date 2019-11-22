import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {PlannerComponent} from './planner/planner.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map/map.component';
import {TimelineComponent} from './timeline/timeline.component';
import {AgmDirectionModule} from 'agm-direction';
import {AgmCoreModule} from '@agm/core';
import {AppMaterialModule} from '../app-material/app-material.module';
import {AddStopComponent} from './add-stop/add-stop.component';
import {HotelCardComponent} from './hotel-card/hotel-card.component';
import {HotelCardListComponent} from './hotel-card-list/hotel-card-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddHotelDetailsComponent} from './add-hotel-details/add-hotel-details.component';
import {AttractionCardListComponent} from './attraction-card-list/attraction-card-list.component';
import {AttractionCardComponent} from './attraction-card/attraction-card.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {ShareTripComponent} from './share-trip/share-trip.component';
import {AddAttractionDetailsComponent} from './add-attraction-details/add-attraction-details.component';
import {TimelineStopComponent} from './timeline-stop/timeline-stop.component';
import {SearchPipe} from './pipe/search.pipe';
import { FilterComponent } from './filter/filter.component';
import { ScrollTrackerDirective } from './directives/scroll-tracker.directive';

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
    ShareTripComponent,
    AddAttractionDetailsComponent,
    TimelineStopComponent,
    SearchPipe,
    FilterComponent,
    ScrollTrackerDirective
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7nHY9ATxaMUjyB_RZfjTwvFC4XVCoWVI',
      libraries: ['places']
    }),
    AgmDirectionModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    AgmDirectionModule,
    AppMaterialModule,
    AgmCoreModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddStopComponent,
    AddHotelDetailsComponent,
    ShareTripComponent,
    AddAttractionDetailsComponent,
    FilterComponent
  ],
  entryComponents: [
    AddHotelDetailsComponent,
    ShareTripComponent,
    AddAttractionDetailsComponent,
    FilterComponent
  ]
})
export class PlannerModule {
}
