import { error } from 'protractor';
import { User } from '../../models/User.model';
import * as authActions from '../actions/auth.actions';

export interface AuthState {
  user: User;
  token: string;
  error: string;
  isLoggedIn: boolean;
}

export function authReducer(state: AuthState, action: authActions.CustomAction) {
  switch (action.type) {
    case authActions.SIGNIN_SUCCESS:
    return {...state,
                token: action.payload,
                isLoggedIn: true,
                error: null
            };
    case authActions.SIGNUP_ERROR:
    case authActions.SIGNIN_ERROR:
    return {...state,
        error: action.payload
    };
  }
  return state;
}
