import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {
  fecha: string;
  ip: string;
  logIn = false;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private localStorage: LocalStorage,
    private router: Router
  ) {
    this.localStorage.getItem('isLoggedIn').subscribe(resp => {
      this.logIn = resp ? true : false;
    });
  }

  ngOnInit(): void {
    this.horaActual();
    this.getIp().then(resp => {
      this.ip = resp;
    });
  }

  sigIn() {
    this.router.navigate(['/login-register']);
  }

  horaActual() {
    setInterval(() => {
      let date = new Date();
      this.fecha = `${
        date.getDate() <= 9
          ? '0'.concat(date.getDate().toString())
          : date.getDate()
        }/${
        date.getMonth() + 1 <= 9
          ? '0'.concat((date.getMonth() + 1).toString())
          : date.getMonth() + 1
        }/${date.getFullYear()} : ${
        date.getHours() <= 9
          ? '0'.concat(date.getHours().toString())
          : date.getHours()
        }:${
        date.getMinutes() <= 9
          ? '0'.concat(date.getMinutes().toString())
          : date.getMinutes()
        }:${
        date.getSeconds() <= 9
          ? '0'.concat(date.getSeconds().toString())
          : date.getSeconds()
        }`;
    }, 1000);
  }

  getIp(): Promise<string> {
    return new Promise((reolve, error) => {
      this.http.get('https://jsonip.com').subscribe(
        data => {
          reolve(data['ip']);
        },
        e => {
          console.error(e);
          error(e);
        }
      );
    });
  }

  public signOut(): void {
    this.auth.logout();
  }
}
