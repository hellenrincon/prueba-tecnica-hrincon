import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigCuantity } from '../../../models/config-cuantity';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { IFinalRequest } from '../../../models/IFinalRequest';
import { SendRequestService } from '../../../services/send-request.service';
import { IRequestCredit } from './../../../models/IRequestCredit';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  @ViewChild('stepperRequest') private myStepper: MatStepper;
  request: Observable<any>;
  setValue: number;
  isLinear = false;
  requestFormGroup: FormGroup;
  userDataFormGroup: FormGroup;
  btnRequestCredit: boolean = true;

  dataCredit: ConfigCuantity;
  objFinal: IFinalRequest = {
    dateRequest: null,
    request: 0,
    status: "EN PROCESO DE SOLICITUD",
    user: null,
    datePay: null
  };

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<{ request: any }>,
    private sendRequestService: SendRequestService,
    private router: Router
  ) {
    this.requestFormGroup = this._formBuilder.group({
      request: ['', Validators.required]
    });
    this.userDataFormGroup = this._formBuilder.group({
      id: [{ value: '', disabled: true }, [Validators.required]],
      name: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      active: [{ value: '', disabled: true }, Validators.required]
    });
    this.request = this.store.pipe(select('request'));
    this.request.subscribe(selected => {
      if (selected) {
        this.setValue = selected.valor;
        this.objFinal.request = selected.valor;
        this.onValueSelected(this.setValue);
      } else {
        this.requestFormGroup.reset();
      }
    });
  }

  ngOnInit() {
    if (this.requestFormGroup.valid) {
      this.goForward();
    }
  }

  onValueSelected(value: number): void {
    this.requestFormGroup.controls.request.setValue(value);
    this.requestFormGroup.updateValueAndValidity();
  }

  goBack(): void {
    this.myStepper.previous();
  }

  goForward(): void {
    this.myStepper.next();
  }

  onDataUser(userData: FormGroup): void {
    this.userDataFormGroup = userData;
    this.userDataFormGroup.updateValueAndValidity();
    if (userData.value.id) {
      this.objFinal.user = userData.value;
      this.objFinal.dateRequest = new Date();
      this.objFinal.datePay = userData.value.datePay;
    }
  }


  selectionChange(event): void {
    this.btnRequestCredit = event.selectedIndex == 2 ? false : true;
  }

  sendRequestCredit(): void {
    let body: IRequestCredit = {
      idUser: this.objFinal.user.id,
      value: this.objFinal.request,
      state: "EN PROCESO DE APROBACIÓN",
      datePay: this.objFinal.datePay,
      dateRequeste: new Date(),
      pay: false
    }
    this.sendRequestService.sendRequestCredit(body).then((response: any) => {
      if (response.status == 200) {
        Swal.fire({
          title: 'Atención.',
          text: response.message,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          this.router.navigate(['/general/reports/history-request']);
        });
      } else if (response.status == 304) {
        Swal.fire({
          title: 'Atención.',
          text: response.message,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Atención.',
          text: response.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
