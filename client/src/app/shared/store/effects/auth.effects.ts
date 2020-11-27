import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, of, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { State } from '..';
import { User } from '../../models/User.model';
import { AuthService, JWT_KEY_STORAGE } from '../../services/auth.service';
import * as authActions from '../actions/auth.actions';
import { tokenSelector } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {
  private subscription: Subscription;
  @Effect()
  trySignUp$ = this.actions$.pipe(
    ofType(authActions.TRY_SIGN_UP),
    map((action: authActions.TrySignup) => action.payload),
    switchMap((user: User) => this.authService.signup(user)),
    switchMap(() => {
      console.log('trySignUp Effect Success');
      this.router.navigate(['/signin']);
      return EMPTY;
    }),
    catchError((error: any) =>  of(new authActions.SignupError(error)))
  );

  @Effect()
  trySignIn$ = this.actions$.pipe(
    ofType(authActions.TRY_SIGN_IN),
    map((action: authActions.TrySignin) => action.payload),
    switchMap((credential: {email: string, password: string}) => this.authService.signin(credential)),
    map((token: string) => {
      console.log('trySignIn Effect Success');
      localStorage.setItem(JWT_KEY_STORAGE, token);
      return new authActions.SigninSuccess(token);
    }),
    catchError((error: any) =>  of(new authActions.SigninError(error)))
  );

  @Effect({dispatch: false})
  signSuccess$ = this.actions$.pipe(
    ofType(authActions.SIGNIN_SUCCESS),
    tap(() => {
      console.log('signSuccess Effect Success');
      if (!this.subscription){
        this.subscription = this.authService.initTimer().subscribe();
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType(authActions.TRY_REFRESH_TOKEN),
    withLatestFrom(this.store.select(tokenSelector)),
    switchMap(([action, token]) => {
      console.log('tryRefreshToken Effect');
      if (token) {
        return this.authService.refreshToken().pipe(
          map((newToken: string) => {
            console.log('tryRefreshToken Effect Success');
            localStorage.setItem(JWT_KEY_STORAGE, newToken);
            return new authActions.SigninSuccess(newToken);
          }),
          catchError((error: any) =>  {
            console.log('tryRefreshToken Effect Error');
            localStorage.removeItem(JWT_KEY_STORAGE);
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
            return EMPTY;
          })
        );
      } else {
        return EMPTY;
      }

    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType(authActions.LOG_OUT),
    tap(() => {
      console.log('logout Effect');
      if (this.subscription) {
        localStorage.removeItem(JWT_KEY_STORAGE);
        this.subscription.unsubscribe();
      }
    })
  );

  constructor(private store: Store<State>, private actions$: Actions, private authService: AuthService, private router: Router) {}
}
