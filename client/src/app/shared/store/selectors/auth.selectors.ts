import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';


export const authSelector = createFeatureSelector('auth');
export const errorAuthSelector = createSelector(authSelector,
  (authState: AuthState) => {
    return authState ? authState.error : null;
  });

export const currentUserSelector = createSelector(authSelector,
  (authState: AuthState) => authState ? authState.user : null);

export const tokenSelector = createSelector(authSelector,
  (authState: AuthState) => authState ? authState.token : null);
