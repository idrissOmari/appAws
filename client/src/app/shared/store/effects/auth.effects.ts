import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../models/User.model';
import { AuthService, JWT_KEY_STORAGE } from '../../services/auth.service';
import * as authActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private subscription: Subscription;
  @Effect()
  trySignUp$ = this.actions$.pipe(
    ofType(authActions.TRY_SIGN_UP),
    map((action: authActions.TrySignup) => action.payload),
    switchMap((user: User) => this.authService.signup(user)),
    switchMap(() => {
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
      localStorage.setItem(JWT_KEY_STORAGE, token);
      return new authActions.SigninSuccess(token);
    }),
    catchError((error: any) =>  of(new authActions.SigninError(error)))
  );

  @Effect({dispatch: false})
  signSuccess$ = this.actions$.pipe(
    ofType(authActions.SIGNIN_SUCCESS),
    tap(() => {
      if (!this.subscription){
        this.subscription = this.authService.initTimer().subscribe();
      }
    })
  );

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType(authActions.TRY_REFRESH_TOKEN),
    switchMap(() => {
      return this.authService.refreshToken();
    }),
    map((newToken: string) => {
      localStorage.setItem(JWT_KEY_STORAGE, newToken);
      return new authActions.SigninSuccess(newToken);
    }),
    catchError((error: any) =>  {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      return EMPTY;
    })
  );


  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
