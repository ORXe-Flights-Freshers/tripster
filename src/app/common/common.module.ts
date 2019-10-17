import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { PlaceAutocompleteComponent } from "./components/place-autocomplete/place-autocomplete.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [HeaderComponent, PlaceAutocompleteComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [HeaderComponent, PlaceAutocompleteComponent]
})
export class CommonModule {}
