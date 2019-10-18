import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { HomePageComponent } from "./home-page.component";
import { SearchComponent } from "./search/search.component";
import { AppMaterialModule } from "../app-material/app-material.module";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  }
];
@NgModule({
  declarations: [HomePageComponent, SearchComponent],
  imports: [
    SharedModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule {}
