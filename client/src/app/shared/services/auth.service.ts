import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtToken } from '../models/JwtToken.model';
import { User } from '../models/User.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
export const JWT_KEY_STORAGE = 'jwt';

@Injectable()
export class AuthService {
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: null,
    token: null
  });

  constructor(private http: HttpClient) {
    this.initToken();
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
    return this.http.post<string>('/api/auth/signin', credentials).pipe(
      tap((tokenString: string) => {
          this.jwtToken.next({
              token: tokenString,
              isAuthenticated: true
          });
          localStorage.setItem(JWT_KEY_STORAGE, tokenString);
      })
    );
  }

  logout() {
    localStorage.removeItem(JWT_KEY_STORAGE);
    this.jwtToken.next({token: null, isAuthenticated: false});
  }
}
