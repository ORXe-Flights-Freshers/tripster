import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PlannerComponent } from "./planner/planner.component";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AppMaterialModule } from "../app-material/app-material.module";
import { AddStopComponent } from './add-stop/add-stop.component';

const routes: Routes = [
  {
    path: "",
    component: PlannerComponent
  },
  {
    path: "add",
    component: AddStopComponent

  }
];

@NgModule({
  declarations: [PlannerComponent, AddStopComponent],
  imports: [SharedModule,
            CommonModule,
            AppMaterialModule,
            RouterModule.forChild(routes)
          ],
   exports:[
            AddStopComponent
          ]       
})
export class PlannerModule {}
