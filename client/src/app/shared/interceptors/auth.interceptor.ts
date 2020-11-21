import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { State } from '../store';
import { tokenSelector } from '../store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  private token: string;

constructor(private store: Store<State>) {
  this.store.select(tokenSelector).subscribe(token => this.token = token);
}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if (this.token){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.token)
    });
    return next.handle(authReq);
  } else {
    return next.handle(req);
  }
}

}
