import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../store';
import { Logout } from '../../store/actions/auth.actions';
import { isLoggedInSelector } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<State>) { }
  ngOnInit(): void {
   this.isLoggedIn$ = this.store.select(isLoggedInSelector);
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

  applyFilter(value: string) {

  }
}
