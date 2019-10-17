import { NgModule } from "@angular/core";
import { CommonModule } from "../../common/common.module";
import { HomePageComponent } from "./home-page.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [HomePageComponent, SearchComponent],
  imports: [CommonModule],
  exports: [HomePageComponent]
})
export class HomePageModule {}
