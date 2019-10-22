import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { PlaceAutocompleteComponent } from "./components/place-autocomplete/place-autocomplete.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from '../modules/app-material/app-material.module';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [HeaderComponent, PlaceAutocompleteComponent],
  imports: [FormsModule, ReactiveFormsModule, AppMaterialModule, CommonModule, MatIconModule],
  exports: [HeaderComponent, PlaceAutocompleteComponent]
})
export class SharedModule {}
