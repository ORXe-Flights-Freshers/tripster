import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '@services/login.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedInSubscription: Subscription;

  constructor(public loginService: LoginService,
              public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.loginService.isLoggedInSubject
                                  .subscribe((isLoggedIn: boolean) => {
                                    if (isLoggedIn) {
                                      this.dialogRef.close();
                                    }
                                  });
  }

}
