import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {

  constructor(
    private router:Router,
    private rest:RestService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.rest.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
    
      //return true;
  }
  
}
