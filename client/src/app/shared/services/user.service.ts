import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/User.model';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public getCurrentUser(): Observable<User> {
    if (this.currentUser.getValue()) {
      return this.currentUser;
    } else {
      return this.http.get<User>('/api/user/current').pipe(
        tap((user: User) => {
          this.currentUser.next(user);
        }),
        switchMap(() => {
          return this.currentUser;
        })
      );
    }
  }
}
