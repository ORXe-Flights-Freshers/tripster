import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-planner",
  templateUrl: "./planner.component.html",
  styleUrls: ["./planner.component.css"]
})
export class PlannerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.params["value"]);
  }
}
