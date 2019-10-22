import { Component, OnInit } from '@angular/core';
import { AddStopComponent } from '../add-stop/add-stop.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';



@Component({
  selector: "app-planner",
  templateUrl: "./planner.component.html",
  styleUrls: ["./planner.component.css"]
})
export class PlannerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='400px';
    dialogConfig.height='510px';
   // dialogConfig.direction='ltr';

    this.dialog.open(AddStopComponent, dialogConfig);
  }
closeDialog(){
  this.dialog.closeAll();
}


}
