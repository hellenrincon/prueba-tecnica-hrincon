import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { IUser } from 'src/app/models/iuser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-step-data-user',
  templateUrl: './step-data-user.component.html',
  styleUrls: ['./step-data-user.component.scss']
})
export class StepDataUserComponent implements OnInit {
  userDataFormGroup: FormGroup;

  @Output() onDataUser = new EventEmitter<FormGroup>();

  constructor(private localStorage: LocalStorage, private _formBuilder: FormBuilder) {
    this.userDataFormGroup = this._formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      active: ['', Validators.required],
      datePay: [''],
      state: ['EN SOLICITUD', Validators.required]
    });
  }


  ngOnInit(): void {

    this.localStorage.getItem('user').subscribe((resUser: IUser) => {
      this.userDataFormGroup.controls['email'].setValue(resUser.email);
      this.userDataFormGroup.controls['id'].setValue(resUser.id);
      this.userDataFormGroup.controls['name'].setValue(resUser.name);
      this.userDataFormGroup.controls['active'].setValue(resUser.active);
      this.userDataFormGroup.updateValueAndValidity();
      this.onDataUser.emit(this.userDataFormGroup)
    });
  }



  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.userDataFormGroup.controls['datePay'].setValue(event.value);
    this.userDataFormGroup.updateValueAndValidity();
    this.onDataUser.emit(this.userDataFormGroup);
  }

}
