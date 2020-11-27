import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/current');
  }
}
