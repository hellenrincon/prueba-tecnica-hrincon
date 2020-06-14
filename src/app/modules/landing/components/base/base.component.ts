import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../../environments/environment'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement } from 'src/app/actions/counter.actions';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  count$: Observable<number>;
  baseDia = environment.baseDia;
  restante = 0;
  constructor(private store: Store<{ count: number }>, private localStorage: LocalStorage) {
    this.count$ = this.store.pipe(select('count'));
    this.count$.subscribe((count: any) => {
      if (count) {
        this.localStorage.setItem('base', count).subscribe((resp:any) => {
          this.restante = count.valor;
        });
      } else {
        this.localStorage.getItem('base').subscribe((resultBase: any) => {
          if (resultBase) {
            this.restante = resultBase.valor;
          } else {
            this.restante = this.baseDia;
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }
}
