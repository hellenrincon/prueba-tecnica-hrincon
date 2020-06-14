import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/models/iuser';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorage, private router: Router) {

  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  public login(user: string): Promise<any> {
    return new Promise((resolve, error) => {
      this.getUserDb(user).then((user: IUser) => {
        if (user.active) {
          this.localStorage.setItem('isLoggedIn', true).subscribe(res => {
            this.localStorage.setItem('user', user).subscribe(resUser => {
              resolve({
                body: user,
                status: 200
              });
            });
          });
        } else {
          resolve({
            body: user,
            status: 204,
            message: "El usuario no existe o es incorrecto, valida e intenta nuevamente."
          });
        }
      });
    })

  }

  public setUser(user: IUser): Promise<any> {
    user.active = true;
    return new Promise((resolve, error) => {
      this.http.post(`http://localhost:3000/users`, user).subscribe((result: any) => {
        if (result) {
          resolve({ body: result, status: 200 });
        } else {
          resolve({ body: [], status: 204 });
        }
      }, (e) => {
        console.log(e);
        error(e);
      });
    });
  }

  logout(): void {
    this.localStorage.removeItem('isLoggedIn').subscribe(res => {
      this.localStorage.removeItem('user').subscribe((res: boolean) => {
        console.log("session removed");
        this.router.navigate(['/landing-page']);
      });
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, error) => {
      this.localStorage.getItem('isLoggedIn').subscribe((res: boolean) => {
        console.log("session state", res);
        resolve(res);
      });
    });
  }

  private getUserDb(user: string): Promise<IUser> {
    return new Promise((resolve, error) => {
      this.http.get(`http://localhost:3000/users?email=${user}`).subscribe((result: any) => {
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(result);
        }
      }, (e) => {
        console.log(e);
        error(e);
      });
    });
  }
}