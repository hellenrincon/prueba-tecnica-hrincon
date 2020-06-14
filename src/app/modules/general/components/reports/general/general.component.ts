import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SendRequestService } from 'src/app/modules/request/services/send-request.service';
import { IUser } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment';
import { IRequestCredit } from 'src/app/modules/request/models/IRequestCredit';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  cols: any[];
  historyUsers: IUser[] = [];
  name: string;
  first = 0;
  rows = 10;
  historyRequest: IRequestCredit[] = [];

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private requestSerivice: SendRequestService
  ) {
    this.localStorage.getItem('user').subscribe((user: IUser) => {
      this.name = user.name;
      this.http.get(`${environment.urlApi}users`).subscribe((histry: IUser[]) => {
        this.historyUsers = histry;
      })
    });
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Cedula' },
      { field: 'name', header: 'Nombres' },
      { field: 'email', header: 'Correo' },
      { field: 'active', header: 'Estado' }
    ];
  }

  onRowSelect(event): void {
    this.getHistory(event.id);
  }

  showGrid = false;
  userFind: string;
  getHistory(id) {
    this.userFind = id;
    this.showGrid = true;
  }

  back() {
    this.userFind = null;
    this.showGrid = false;
  }

}
