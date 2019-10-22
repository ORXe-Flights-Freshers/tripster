import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { SearchComponent } from './search/search.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material';
import { TimePickerThemeDirective } from './time-picker-theme/time-picker-theme.directive';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];
@NgModule({
  declarations: [HomePageComponent, SearchComponent, TimePickerThemeDirective],
  imports: [
    SharedModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
