import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_KEY_STORAGE } from '../services/auth.service';


export class AuthInterceptor implements HttpInterceptor{


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(JWT_KEY_STORAGE);
    if (token){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
