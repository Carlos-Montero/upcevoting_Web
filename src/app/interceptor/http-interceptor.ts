import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class HttpInterceptorHelper {
    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      if(req.url.match('http://localhost:3000/users/signin') || req.url.match('http://localhost:3000/users/signup')) {
        return next.handle(req);
      }
      const authorization = this.authService.getToken();
      const apiReq = req.clone({
        headers: req.headers.set('Authorization', authorization)
      });
      return next.handle(apiReq)
        .catch((error, caught) => {
  
          if (error.status === 401) {
              //logout users, redirect to login page
              //this.authService.removeTokens();
              this.router.navigate(['/signin']);
              return Observable.throw(error);
  
          };
          if(error.status === 419){
            return Observable.throw(error);
          }
          return Observable.throw(error);
        });
    }
  }
  
  export default HttpInterceptorHelper;
  
