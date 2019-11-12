import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatButton } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-trip',
  templateUrl: './share-trip.component.html',
  styleUrls: ['./share-trip.component.css']
})
export class ShareTripComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ShareTripComponent>,
              private http: HttpClient, private router: Router) { }
  email: string;

  shareTripForm = new FormGroup({
    email: new FormControl(this.email, [
      Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
    ])
  });

  mailServerLink = 'http://3.14.69.62:10000/api/send';
  subject = 'Shared RoadTrip from Tripster';
  body = 'Hey, Here is the shareable link for the roadtrip : http://3.14.69.62';


  ngOnInit() {
  }

  share(shareBtn: MatButton) {
    shareBtn.disabled = true;
    shareBtn._elementRef.nativeElement.textContent = 'Sending...';
    const email = this.shareTripForm.controls.email.value;
    this.http.post(this.mailServerLink, {
      to: [email],
      subject: this.subject,
      body: this.body + this.router.url
    }).subscribe(value => {
      this.closeDialog();
      // @ts-ignore
      this.openSnackBar(value.message);
    }, (error: HttpErrorResponse) => {
      this.closeDialog();
      this.openSnackBar('An error occurred at our side');
    });
  }

  copyShareableLink() {
    const ele = document.createElement('input');
    ele.value = 'http://3.14.69.62' + this.router.url;
    document.body.appendChild(ele);
    ele.select();
    document.execCommand('copy');
    document.body.removeChild(ele);
    this.closeDialog();
    this.openSnackBar('Link has been copied to clipboard');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
