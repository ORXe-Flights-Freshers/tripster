import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { PlaceAutocompleteComponent } from "./components/place-autocomplete/place-autocomplete.component";

@NgModule({
  declarations: [HeaderComponent, PlaceAutocompleteComponent],
  imports: [],
  exports: [HeaderComponent, PlaceAutocompleteComponent]
})
export class CommonModule {}
