import { NgModule } from "@angular/core";
import { CommonModule } from "../../common/common.module";
import { HomePageComponent } from "./home-page.component";
import { SearchComponent } from "./search/search.component";
import { AppMaterialModule } from "../app-material/app-material.module";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  }
];
@NgModule({
  declarations: [HomePageComponent, SearchComponent],
  imports: [CommonModule, AppMaterialModule, RouterModule.forChild(routes)],
  exports: [HomePageComponent]
})
export class HomePageModule {}
