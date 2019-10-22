import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PlannerComponent } from "./planner/planner.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { AgmDirectionModule } from "agm-direction";
import { AgmCoreModule } from "@agm/core";

const routes: Routes = [
  {
    path: ":id",
    component: PlannerComponent
  }
];

@NgModule({
  declarations: [PlannerComponent, MapComponent, TimelineComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC2LnC7a1z5MDzBjx4Us9qo9Z4Yupum03A",
      libraries: ["places"]
    }),
    AgmDirectionModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    AgmDirectionModule,
    AgmCoreModule
  ]
})
export class PlannerModule {}
