import { User } from '../../models/User.model';
import { JWT_KEY_STORAGE } from '../../services/auth.service';
import { CustomAction } from '../actions';
import * as authActions from '../actions/auth.actions';
import { SET_CURRENT_USER } from '../actions/user.actions';
import { AuthState } from '../auth.state';

const initialState: AuthState = {
  error: null,
  isLoggedIn: null,
  token: localStorage.getItem(JWT_KEY_STORAGE),
  user: null
};

export function authReducer(state: AuthState = initialState, action: CustomAction) {
  console.log('Reducer for :', action.type);
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
    case SET_CURRENT_USER:
    return {...state,
      user: action.payload,
      error: null
    };
    case authActions.LOG_OUT:
    return {
      ...state,
      user: null,
      token: null,
      isLoggedIn: false,
      error: null
    };
  }
  return state;
}
