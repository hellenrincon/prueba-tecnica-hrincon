import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { IRequestCredit } from '../models/IRequestCredit';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AllAction from './../../../actions/counter.actions';


@Injectable({
  providedIn: 'root'
})
export class SendRequestService {
  counterBase: Observable<number>;

  constructor(
    private http: HttpClient,
    private store: Store<{ count: any }>
  ) {
    this.counterBase = this.store.pipe(select('count'));
  }

  public sendRequestCredit(body: IRequestCredit): Promise<any> {
    body.id = uuidv4();
    body.state = this.getRandom() == 0 ? "RECHAZADO" : "APROBADO";
    body.pay = body.state == "RECHAZADO" ? true : false;
    //resto de la base solo si el credito fue aprobado. 
    if (!body.pay) {
      this.store.dispatch(new AllAction.decrementBase(body.value));
    }
    return new Promise((resolve) => {
      //Primero valido si tiene creditos rechazados.
      this.getUserCredits(`credits?idUser=${body.idUser}&state=RECHAZADO&_start=0&_end=1`).then((rejectedsPay) => {
        if (rejectedsPay.length == 0) {
          //Ahora valido que no tenga pagos pendintes por ejecutar
          this.getUserCredits(`credits?idUser=${body.idUser}&pay=false&_start=0&_end=1`).then((pendingPay) => {
            if (pendingPay.length == 0) {
              //Como no tiene pagos pendientes ahora si, genero el credito.
              this.executeCredit(body).then(result => {
                resolve({ status: 200, body: result, message: "Tu credito esta en proceso de aprobación, por favor consulta en la vista de solicitudes para conocer el estado actual." });
              }, (e) => {
                resolve({ status: 400, message: "Se presento un error, por favor conuniquese con el administrador." });
              });
            } else {
              resolve({ status: 304, message: "Tienes creditos vigenes y pendintes por pagar, por favor valida la información y vuelve a intentarlo." });
            }
          });
        } else {
          this.getUserCredits(`credits?idUser=${body.idUser}&state=APROBADO&_start=0&_end=1`).then((historyApproved) => {
            if (historyApproved.length > 0) {
              //Nuevamente valido que no tenga pagos pendintes por ejecutar
              this.getUserCredits(`credits?idUser=${body.idUser}&pay=false&_start=0&_end=1`).then((pendingPay) => {
                if (pendingPay.length == 0) {
                  //Como alguna vez le aprobaron creditos y no tiene pendientes por pagar y sele puede negar entonces genero credito.
                  this.executeCredit(body).then(result => {
                    resolve({ status: 200, body: result, message: "Tu credito esta en proceso de aprobación, por favor consulta en la vista de solicitudes para conocer el estado actual." });
                  }, (e) => {
                    resolve({ status: 400, message: "Se presento un error, por favor conuniquese con el administrador." });
                  });
                } else {
                  resolve({ status: 304, message: "Tienes creditos vigenes y pendintes por pagar, por favor valida la información y vuelve a intentarlo." });
                }
              });
            } else {
              resolve({ status: 304, message: "No es posible radicar tu solicitud, por favor ponte en contacto con uno de nuestros asesores, ellos te ampliaran esta información" });
            }
          }, (e) => {
            resolve({ status: 400, message: "Se presento un error, por favor conuniquese con el administrador." });
          })
        }
      });
    });
  }

  /**
   * 
   * @param body Metodo generico para agregar creditos.
   * HRincon
   * 11/06/2020
   */
  public executeCredit(body: IRequestCredit): Promise<any> {
    return new Promise((resolve, error) => {
      this.http.post(`${environment.urlApi}credits`, body).subscribe((response: any) => {
        resolve(response);
      }, (e) => {
        error(e)
      });
    });
  }

  getRandom(): number {
    return Math.floor(Math.random() * (2 - (-1)) + 0);
  }

  /**
   * Valido si el cliente se le aprobo alguna vez un credito, no se le debe negar nunca. 
   */
  private getUserApproved(body: IRequestCredit): Promise<boolean> {
    return new Promise((resolve, error) => {
      this.http.get(`${environment.urlApi}credits?idUser=${body.idUser}&state=APROBADO&_start=0&_end=1`)
        .subscribe((response: any) => {
          if (response.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, (e) => {
          error(e)
        })
    });
  }

  /**
 * Valido si el cliente se le aprobo alguna vez un credito, no se le debe negar nunca. 
 */
  private getUserCredits(params: string): Promise<any> {
    return new Promise((resolve, error) => {
      this.http.get(`${environment.urlApi}${params}`)
        .subscribe((response: any) => {
          resolve(response);
        }, (e) => {
          error(e)
        })
    });
  }

  payDebt(credit: IRequestCredit): Promise<any> {
    return new Promise((result, error) => {
      this.http.put(`${environment.urlApi}credits/${credit.id}`, credit).subscribe((resp:any) => {
        this.store.dispatch(new AllAction.incrementBase(resp.value));
        result(resp);
      }, (e) => {
        error(e);
      })
    });
  }
}



