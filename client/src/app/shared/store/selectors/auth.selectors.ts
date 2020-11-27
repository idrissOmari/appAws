import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';


export const authSelector = createFeatureSelector('auth');
export const errorAuthSelector = createSelector(authSelector,
  (authState: AuthState) => {
    console.log('Error selector');
    return authState ? authState.error : null;
  });

export const currentUserSelector = createSelector(authSelector,
  (authState: AuthState) => {
    console.log('CurrentUser selector');
    return authState ? authState.user : null;
  });

export const tokenSelector = createSelector(authSelector,
  (authState: AuthState) => {
    console.log('Token selector');
    return authState ? authState.token : null;
  });

export const isLoggedInSelector = createSelector(authSelector,
  (authState: AuthState) => {
    console.log('LoggedIn selector');
    return authState ? authState.isLoggedIn : null;
  });
