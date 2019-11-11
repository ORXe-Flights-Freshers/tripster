import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-trip',
  templateUrl: './share-trip.component.html',
  styleUrls: ['./share-trip.component.css']
})
export class ShareTripComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ShareTripComponent>, private http: HttpClient, private router: Router) { }
  email: string;
  mailServerLink: string = "http://172.16.5.140:10000/api/send";
  subject: string = "Shared RoadTrip from Tripster";
  body: string = "Hey, Here is the shareable link for the roadtrip : http://3.14.69.62:82";


  ngOnInit() {
  }
  shareTripForm = new FormGroup({
    email: new FormControl(this.email, [
      Validators.required, Validators.email
    ])
  });

  share() {
    let email = this.shareTripForm.controls['email'].value;
    this.http.post(this.mailServerLink,{
      to:[email],
      subject:this.subject,
      body:this.body+this.router.url
    }).subscribe(value =>{ 
      this.closeDialog();
        this.openSnackBar(value['message'])
    },(error:HttpErrorResponse)=>{
      this.closeDialog()
    
      this.openSnackBar("An error occured at our side");
    })
  }
  copyShareableLink(){
    var ele = document.createElement("input");
    ele.value = "http://3.14.69.62:82"+ this.router.url;
    document.body.appendChild(ele);
    ele.select();
    document.execCommand('copy');
    document.body.removeChild(ele);
    this.closeDialog();
    this.openSnackBar("Link has been copied to clipboard");
  }
  openSnackBar(message: string) {
    this.snackBar.open(message,"",{
      duration: 2000,
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
