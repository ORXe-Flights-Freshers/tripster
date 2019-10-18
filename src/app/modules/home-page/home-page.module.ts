import { NgModule } from "@angular/core";
import { CommonModule } from "../../common/common.module";
import { HomePageComponent } from "./home-page.component";
import { SearchComponent } from "./search/search.component";
import { AppMaterialModule } from "../app-material/app-material.module";

@NgModule({
  declarations: [HomePageComponent, SearchComponent],
  imports: [CommonModule, AppMaterialModule],
  exports: [HomePageComponent]
})
export class HomePageModule {}
