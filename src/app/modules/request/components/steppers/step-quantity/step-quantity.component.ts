import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigCuantity } from '../../../models/config-cuantity';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import *as actionReques from './../../../../../actions/request.action';


@Component({
  selector: 'app-step-quantity',
  templateUrl: './step-quantity.component.html',
  styleUrls: ['./step-quantity.component.scss']
})
export class StepQuantityComponent implements OnInit {
  valueStart: number = 0;

  @Input()
  set setValue(value: number) {
    this.valueStart = value;
  }

  @Output()
  onValueSelected = new EventEmitter<number>();




  configuration: ConfigCuantity;
  valueSelected: number;
  request: Observable<any>;
  constructor(private http: HttpClient, private store: Store<{ request: any }>) {
    this.request = this.store.pipe(select('request'));
  }

  ngOnInit(): void {
    this.getDataCredit();
  }

  private getDataCredit() {
    this.http.get('http://localhost:3000/credit/1').subscribe((result: any) => {
      this.configuration = {
        maxValue: result.max,
        minValue: result.min,
        step: 10000
      }
      this.valueSelected = this.valueStart >= this.configuration.minValue ? this.valueStart : result.min;
      this.onValueSelected.emit(result.min);
    }, (e) => {

    })
  }

  public onSelectedValueCredit(value) {
    this.valueSelected = value.value;
    this.onValueSelected.emit(this.valueSelected);
    this.store.dispatch(new actionReques.Add(this.valueSelected));
  }

}
