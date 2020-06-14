import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'
import { IRequestCredit } from 'src/app/modules/request/models/IRequestCredit';
import { HttpClient } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SendRequestService } from 'src/app/modules/request/services/send-request.service';
import { IUser } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  selectabledT = false;

  @Input()
  set selectebled(selectabled: boolean) {
    this.selectabledT = selectabled;
  }

  @Output()
  rowSelected = new EventEmitter<IUser>();


  cols: any[];
  historyUsers: IUser[] = [];
  name: string;
  first = 0;
  rows = 10;


  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private requestSerivice: SendRequestService
  ) { }

  ngOnInit(): void {
    this.getDataHistory();
    this.cols = [
      { field: 'id', header: 'Cedula' },
      { field: 'name', header: 'Nombres' },
      { field: 'email', header: 'Correo' },
      { field: 'active', header: 'Estado' }
    ];
  }

  getDataHistory(): void {
    this.localStorage.getItem('user').subscribe((user: IUser) => {
      this.name = user.name;
      this.http.get(`${environment.urlApi}users`).subscribe((histry: IUser[]) => {
        this.historyUsers = histry;
      })
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.historyUsers.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
  selectCarWithButton(event) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Atención',
      text: "Al hacer click en aceptar realizas el pago del 100% de tu deuda.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        event.pay = true;
        this.requestSerivice.payDebt(event).then((resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Tu deuda se pago con exito!!!',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
          }).then((res) => {
            this.getDataHistory();
          }, (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al ejecutar la transacción',
              showConfirmButton: false,
              timer: 1500
            })
          });
        });
      }
    })
  }
  obj: any;
  onRowSelect(event) {
    this.rowSelected.emit(event.data);
  }
}
