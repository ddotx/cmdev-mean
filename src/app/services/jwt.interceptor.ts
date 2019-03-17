import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { environment } from 'src/assets/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router:Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authInfo = JSON.parse(localStorage.getItem(environment.localAuthenInfo))
    if (authInfo != null) {
      const cloned = req.clone({ headers: req.headers.set('x-access-token', authInfo.token) });
      //const cloned = req.clone({ headers: req.headers.set('x-access-token', "123") });
           
      // simple way
      //return next.handle(cloned);


      // Intercept response too
      // npm i --save rxjs-compat
      return next.handle(cloned).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403 || err.status === 500) {
            // redirect to the login route
            // or show a modal
            //alert("Token is not valid");
              localStorage.setItem(environment.localAuthenInfo, null);      
              this.router.navigate(["/login"]);
          }
        }
      });

    } else {
      return next.handle(req);
    }
  }
}