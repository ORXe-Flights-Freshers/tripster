import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomePageModule } from "./modules/home-page/home-page.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PlaceAutocompleteComponent } from "./common/components/place-autocomplete/place-autocomplete.component";
import { AgmDirectionModule } from "agm-direction";
import { CommonModule } from "./common/common.module";

@NgModule({
  declarations: [AppComponent, PlaceAutocompleteComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC2LnC7a1z5MDzBjx4Us9qo9Z4Yupum03A"
    }),
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    HomePageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmDirectionModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
