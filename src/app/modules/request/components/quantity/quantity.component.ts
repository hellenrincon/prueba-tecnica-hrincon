import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  public valueSelected = 0;
  request: Observable<any>;
  algo: any;

  constructor(private router: Router, private store: Store<{ request: any }>) {
    this.request = this.store.pipe(select('request'));
    this.request.subscribe(result => {
      if (result) {
        this.valueSelected = result.valor;
      }
    })
  }

  ngOnInit(): void {
  }

  public continue() {
    if (this.valueSelected > 0) {
      this.navigate('/steppers-request/steppers/start-steps');
    } else {

    }
  }

  public navigate(url: string) {
    this.router.navigate([url]);
  }

  onValueSelected(value) {
    this.valueSelected = value;
  }
}
