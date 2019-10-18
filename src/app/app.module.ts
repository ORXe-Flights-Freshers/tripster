import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { AppComponent } from "./app.component";
import { HomePageModule } from "./modules/home-page/home-page.module";
import { AgmDirectionModule } from "agm-direction";
import { CommonModule } from "./common/common.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC2LnC7a1z5MDzBjx4Us9qo9Z4Yupum03A",
      libraries: ["places"]
    }),
    HomePageModule,
    HttpClientModule,
    AgmDirectionModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
