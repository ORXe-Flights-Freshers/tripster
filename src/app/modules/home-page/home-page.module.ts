import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from 'app/shared/shared.module';
import {HomePageComponent} from './home-page.component';
import {SearchComponent} from './search/search.component';
import {AppMaterialModule} from '../app-material/app-material.module';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import { PopularTripComponent } from './popular-trip/popular-trip.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [HomePageComponent, SearchComponent, PopularTripComponent],
  imports: [
    SharedModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  exports: [HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {
}
