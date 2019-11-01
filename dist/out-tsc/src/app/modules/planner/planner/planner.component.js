import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { AddStopComponent } from "../add-stop/add-stop.component";
let PlannerComponent = class PlannerComponent {
    constructor(route, tripService, http, dialog) {
        this.route = route;
        this.tripService = tripService;
        this.http = http;
        this.dialog = dialog;
    }
    ngOnInit() {
        // @ts-ignore
        const id = this.route.params.value.id;
        this.http.get("http://3.14.69.62:5000/api/trip/" + id).subscribe(data => {
            this.tripService.trip = data;
        });
        // console.log(this.route.params["value"]);
    }
    openDialog() {
        const dialogConfig = new MatDialogConfig();
        // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "400px";
        dialogConfig.height = "510px";
        const dialogRef = this.dialog.open(AddStopComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(stopFromDialog => {
            console.log(stopFromDialog);
            if (stopFromDialog != undefined)
                this.addStop(stopFromDialog);
        });
    }
    addStop(stop) {
        // let stopToAdd=this.generateStop(stop);
        this.tripService.addStopToTrip(stop);
    }
    closeDialog() {
        this.dialog.closeAll();
    }
};
PlannerComponent = tslib_1.__decorate([
    Component({
        selector: "app-planner",
        templateUrl: "./planner.component.html",
        styleUrls: ["./planner.component.css"]
    })
], PlannerComponent);
export { PlannerComponent };
//# sourceMappingURL=planner.component.js.map