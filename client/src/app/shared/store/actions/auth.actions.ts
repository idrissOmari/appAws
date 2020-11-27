import { Action } from '@ngrx/store';
import { CustomAction } from '.';
import { User } from '../../models/User.model';

export const TRY_SIGN_UP = '[USER] try signup';
export const SIGNUP_SUCCESS = '[USER] signup success';
export const SIGNUP_ERROR = '[USER] signup error';

export const TRY_SIGN_IN = '[USER] try signin';
export const SIGNIN_SUCCESS = '[USER] signin success';
export const SIGNIN_ERROR = '[USER] signin error';

export const TRY_REFRESH_TOKEN = '[USER] try refresh token';
export const LOG_OUT = '[USER] logout';


// SIGNUP
export class TrySignup implements CustomAction {
  readonly type: string = TRY_SIGN_UP;
  constructor(public payload: User) {}
}

export class SignupSuccess implements CustomAction {
  readonly type: string = SIGNUP_SUCCESS;
  constructor(public payload: User) {}
}

export class SignupError implements CustomAction {
  readonly type: string = SIGNUP_ERROR;
  constructor(public payload: any) {}
}

// SIGNIN
export class TrySignin implements CustomAction {
  readonly type: string = TRY_SIGN_IN;
  constructor(public payload: {email: string, password: string}) {}
}

export class SigninSuccess implements CustomAction {
  readonly type: string = SIGNIN_SUCCESS;
  constructor(public payload: string) {}
}

export class SigninError implements CustomAction {
  readonly type: string = SIGNIN_ERROR;
  constructor(public payload: any) {}
}
// Token refresh
export class TryRefreshToken implements CustomAction {
  readonly type: string = TRY_REFRESH_TOKEN;
}

// Logout
export class Logout implements CustomAction {
  readonly type: string = LOG_OUT;
}

export type AuthActions = TrySignup
| TryRefreshToken
| SignupSuccess
| SignupError
| TrySignin
| SigninSuccess
| SigninError
| Logout;
