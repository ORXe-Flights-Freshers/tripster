import { Component, OnInit } from '@angular/core';
import { AddStopComponent } from '../add-stop/add-stop.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: "app-planner",
  templateUrl: "./planner.component.html",
  styleUrls: ["./planner.component.css"]
})
export class PlannerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStopComponent, {
      width: '360px',
      height:'450px'
    });

  
  }
}
