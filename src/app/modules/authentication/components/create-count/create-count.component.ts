import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-count',
  templateUrl: './create-count.component.html',
  styleUrls: ['./create-count.component.scss']
})
export class CreateCountComponent implements OnInit {
  errorMsn: string;
  registerForm: FormGroup;
  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group(
      {
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }
  ngOnInit(): void {
  }

  public sendRegister() {
    if (this.registerForm.valid) {
      this.errorMsn = undefined;
      this.auth.setUser(this.registerForm.value).then(respAut => {
        if (respAut.status == 200) {
          this.auth.login(this.registerForm.value.email).then(respAut => {
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
          this.errorMsn = respAut.message;
        }
      }, (e) => {
        this.errorMsn = "El Usuario ya existe, por favor valide e intente nuevamente."
      });
    } else {
      return false;
    }
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }

}
