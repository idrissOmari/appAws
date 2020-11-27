import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './auth.state';
import { authReducer } from './reducers/auth.reducers';

export interface State {
  auth: AuthState;
}


export const reducersMap: ActionReducerMap<State> =  {
  auth: authReducer
};
