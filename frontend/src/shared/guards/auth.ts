import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

// import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
  })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router,
    //  private readonly auth: AuthService
     ) {
    // Nothing
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user;
    user = localStorage.getItem('user');
    if(user){
      user=JSON.parse(user);
    }
    else{
      this.router.navigate(["/login"]).catch((_error) => undefined);
    }
    return true;
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
