import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {PlaceAutocompleteComponent} from './components/place-autocomplete/place-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../modules/app-material/app-material.module';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [HeaderComponent, PlaceAutocompleteComponent, NotFoundComponent, LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    RouterModule
  ],
  entryComponents: [LoginComponent],
  exports: [HeaderComponent, PlaceAutocompleteComponent]
})
export class SharedModule {
}
