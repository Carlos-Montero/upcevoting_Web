import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class HttpInterceptorHelper implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(req.url.match('users/signin') || req.url.match('users/signup') || req.url.match('users/vote')) {
      return next.handle(req);
    }
    const authorization = this.authService.getToken();
    const apiReq = req.clone({
      headers: req.headers.set('Authorization', authorization)
    });
    return next.handle(apiReq);
      
  }
}

export default HttpInterceptorHelper;
  
