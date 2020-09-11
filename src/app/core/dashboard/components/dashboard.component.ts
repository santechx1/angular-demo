import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromCore from '../../core/reducers';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuResource } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu$: Observable<MenuResource[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.menu$ = store.pipe(select(fromCore.getMenuState),
      filter(s => !!s.menu),
      map(s => s.menu));
  }
  ngOnInit() { }
}
