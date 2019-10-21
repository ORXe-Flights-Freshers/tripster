import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PlannerComponent } from "./planner/planner.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { TimelineComponent } from "./timeline/timeline.component";

const routes: Routes = [
  {
    path: ":id",
    component: PlannerComponent
  }
];

@NgModule({
  declarations: [PlannerComponent, MapComponent, TimelineComponent],
  imports: [SharedModule, CommonModule, RouterModule.forChild(routes)]
})
export class PlannerModule {}
