import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { State } from '..';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { SigninError } from '../actions/auth.actions';
import { SetCurrentUser, TRY_FETCH_USER } from '../actions/user.actions';
import { currentUserSelector } from '../selectors/auth.selectors';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private store: Store<State>, private userService: UserService, private router: Router) {
  }
  @Effect()
  tryFetchUser$ = this.actions$.pipe(
    ofType(TRY_FETCH_USER),
    switchMap(() => {
        return this.userService.getCurrentUser();
    }),
    map((user: User) =>  {
      console.log('tryFetchUser Effect SUCCESS', user);
      return new SetCurrentUser(user);
    }),
    catchError((error: any) =>  EMPTY)
  );
}
