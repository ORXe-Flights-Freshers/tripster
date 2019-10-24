import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PlannerComponent } from "./planner/planner.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MapComponent } from "./map/map.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { AgmDirectionModule } from "agm-direction";
import { AgmCoreModule } from "@agm/core";
import { AppMaterialModule } from "../app-material/app-material.module";
import { AddStopComponent } from "./add-stop/add-stop.component";
import { MatIconModule } from "@angular/material";
const routes: Routes = [
  {
    path: ":id",
    component: PlannerComponent
  },
  {
    path: "add",
    component: AddStopComponent
  }
];

@NgModule({
  declarations: [
    PlannerComponent,
    MapComponent,
    TimelineComponent,
    AddStopComponent
  ],
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
    AppMaterialModule,
    AgmCoreModule,
    MatIconModule
  ],
  exports: [AddStopComponent]
})
export class PlannerModule {}
