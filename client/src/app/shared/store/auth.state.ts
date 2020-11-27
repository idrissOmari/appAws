import { User } from '../models/User.model';

export interface AuthState {
  user: User;
  token: string;
  error: string;
  isLoggedIn: boolean;
}
