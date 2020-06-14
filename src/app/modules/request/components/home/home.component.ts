import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carrosusels: any;
   constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCarrousels();
  }

  private getCarrousels() {

    this.http.get(`${environment.urlApi}carrousel`).subscribe((resp: any) => {
      this.carrosusels = resp;
    });
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }


}
