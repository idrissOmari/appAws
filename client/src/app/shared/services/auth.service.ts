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
    return timer(3000, 10000).pipe(
      map(() => this.store.dispatch(new TryRefreshToken()))
    );
    // return timer(8000, 15000).pipe(
    //   switchMap(() => {
    //     console.log('refresh token');
    //     const storageToken: string = localStorage.getItem(JWT_KEY_STORAGE);
    //     if (storageToken) {
    //       return this.http.get<string>('/api/auth/refresh-token').pipe(
    //         tap((newToken: string) => {
    //           this.jwtToken.next({
    //             token: newToken,
    //             isAuthenticated: true
    //           });
    //           localStorage.setItem(JWT_KEY_STORAGE, newToken);
    //         }, error => {
    //           console.log('error refresh token', error);
    //           this.subscription.unsubscribe();
    //         })
    //       );
    //     } else {
    //       this.subscription.unsubscribe();
    //       return of(EMPTY);
    //     }
    //   })
    // ).subscribe(() => {},
    // err => {
    //   console.log('distroy token');
    //   this.jwtToken.next({
    //     token: null,
    //     isAuthenticated: true
    //   });
    //   localStorage.removeItem(JWT_KEY_STORAGE);
    //   this.subscription.unsubscribe();
    // });
  }

  initToken(): void {
    const storageToken: string = localStorage.getItem(JWT_KEY_STORAGE);
    this.jwtToken.next({
      isAuthenticated: storageToken != null,
      token: storageToken
    });
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

  logout() {
    localStorage.removeItem(JWT_KEY_STORAGE);
    this.jwtToken.next({token: null, isAuthenticated: false});
    this.router.navigate(['/']);
  }
}
