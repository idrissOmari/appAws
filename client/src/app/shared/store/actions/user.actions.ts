import { CustomAction } from '.';
import { User } from '../../models/User.model';

export const TRY_FETCH_USER = '[USER] try fetch current user';
export const SET_CURRENT_USER = '[USER] set current user';

// CurrentUser
export class TryFetchCurrentUser implements CustomAction {
  readonly type: string = TRY_FETCH_USER;
}

export class SetCurrentUser implements CustomAction {
  readonly type: string = SET_CURRENT_USER;
  constructor(public payload: User) {}
}
