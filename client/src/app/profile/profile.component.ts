import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { State } from '../shared/store';
import { TryFetchCurrentUser } from '../shared/store/actions/user.actions';
import { currentUserSelector } from '../shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser$: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(new TryFetchCurrentUser());
    this.currentUser$ = this.store.select(currentUserSelector);
  }
}
