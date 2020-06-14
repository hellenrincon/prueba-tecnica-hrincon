import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMsn: string;
  LogInForm: FormGroup;
  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.LogInForm = this.formBuilder.group(
      {
        user: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
  }

  public sendLogIn() {
    if (this.LogInForm.valid) {
      this.errorMsn = undefined;
      this.auth.login(this.LogInForm.value.user).then(respAut => {
        if (respAut.status == 200) {
          if (this.auth.redirectUrl) {
            this.navigate(this.auth.redirectUrl);
          } else {
            this.navigate('/landing-page');
          }

        } else {
          this.errorMsn = respAut.message;
        }
      });
    } else {
      return false;
    }

  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }

}
