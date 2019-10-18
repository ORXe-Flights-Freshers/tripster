import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./modules/home-page/home-page.module#HomePageModule"
  },
  {
    path: "planner",
    loadChildren: "./modules/planner/planner.module#PlannerModule"
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
