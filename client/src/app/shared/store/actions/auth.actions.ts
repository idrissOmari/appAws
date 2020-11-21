import { Action } from '@ngrx/store';
import { User } from '../../models/User.model';

export const TRY_SIGN_UP = '[USER] try signup';
export const SIGNUP_SUCCESS = '[USER] signup success';
export const SIGNUP_ERROR = '[USER] signup error';

export const TRY_SIGN_IN = '[USER] try signin';
export const SIGNIN_SUCCESS = '[USER] signin success';
export const SIGNIN_ERROR = '[USER] signin error';

export const TRY_FETCH_USER = '[USER] try fetch current user';
export const SET_CURRENT_USER = '[USER] set current user';

export const TRY_REFRESH_TOKEN = '[USER] try refresh token';

export interface CustomAction extends Action {
  payload?: any;
}

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

// CurrentUser
export class TryFetchCurrentUser implements CustomAction {
  readonly type: string = TRY_FETCH_USER;
  constructor(public payload: any) {}
}

export class SetCurrentUser implements CustomAction {
  readonly type: string = SET_CURRENT_USER;
  constructor(public payload: User) {}
}
// Token refresh
export class TryRefreshToken implements CustomAction {
  readonly type: string = TRY_REFRESH_TOKEN;
}

export type AuthActions = TrySignup
|TryRefreshToken
|SignupSuccess
|SignupError
|TrySignin
|SigninSuccess
|SigninError
|TryFetchCurrentUser
|SetCurrentUser;
