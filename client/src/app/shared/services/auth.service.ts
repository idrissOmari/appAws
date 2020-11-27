import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, Subscription, timer } from 'rxjs';
import { JwtToken } from '../models/JwtToken.model';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { TryRefreshToken } from '../store/actions/auth.actions';
export const JWT_KEY_STORAGE = 'jwt';

@Injectable()
export class AuthService {
  public subscription: Subscription;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null
  });

  constructor(private http: HttpClient, private router: Router
            , private store: Store<State>) {
  }
  public initTimer(): Observable<void> {
    return EMPTY;
    //  timer(10000, 20000).pipe(
    //   map(() => this.store.dispatch(new TryRefreshToken()))
    // );
  }

  signup(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/signup', user);
  }

  signin(credentials: {email: string, password: string}): Observable<string>{
    return this.http.post<string>('/api/auth/signin', credentials);
  }

  refreshToken(): Observable<string> {
    return this.http.get<string>('/api/auth/refresh-token');
  }
}
