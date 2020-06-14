import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorage } from '@ngx-pwa/local-storage';
import Swal from 'sweetalert2'
import { SendRequestService } from 'src/app/modules/request/services/send-request.service';
import { IRequestCredit } from 'src/app/modules/request/models/IRequestCredit';
import { IUser } from 'src/app/models/iuser';

@Component({
  selector: 'app-history-request',
  templateUrl: './history-request.component.html',
  styleUrls: ['./history-request.component.scss']
})
export class HistoryRequestComponent implements OnInit {
  @Input()
  set idUser(idUser: string) {
    this.idUserFind = idUser;
  }

  idUserFind: string;
  cols: any[];
  historyRequest: IRequestCredit[] = [];
  name: string;
  first = 0;
  rows = 10;
  userLogin: IUser;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage,
    private requestSerivice: SendRequestService
  ) {
   
  }

  ngOnInit(): void {
    this.localStorage.getItem('user').subscribe((user: IUser) => {
      this.name = user.name;
      this.userLogin= user;
      if (this.idUserFind == null) {
        this.getDataHistory(this.userLogin.id);
      } else {
        this.getDataHistory(this.idUserFind);
      }
    });
   
    
    this.cols = [
      { field: 'idUser', header: 'Cedula' },
      { field: 'value', header: 'Monto' },
      { field: 'state', header: 'Estado' },
      { field: 'dateRequeste', header: 'Fecha solicitud' },
      { field: 'pay', header: 'Pagado' }
    ];
  }

  getDataHistory(id:string): void {
    this.http.get(`${environment.urlApi}credits?idUser=${id}`).subscribe((histry: IRequestCredit[]) => {
      this.historyRequest = histry;
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
    return this.first === (this.historyRequest.length - this.rows);
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
            this.getDataHistory(this.userLogin.id);
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
}
