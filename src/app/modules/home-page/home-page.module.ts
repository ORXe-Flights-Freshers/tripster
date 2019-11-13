import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { SearchComponent } from './search/search.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];
@NgModule({
  declarations: [HomePageComponent, SearchComponent],
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
export class HomePageModule {}
