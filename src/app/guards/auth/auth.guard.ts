import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    return this.checkLogin(url).then(result => {
      return result;
    });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state);
  }


  checkLogin(url: string): Promise<boolean> {
    return new Promise((resolve, error) => {
      this.authService.isLoggedIn().then((resultLogin: boolean) => {
        if (resultLogin) {
          resolve(true);
        }
        else {
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = url;
          // Navigate to the login page with extras
          this.router.navigate(['/login-register']);
          resolve(false);
        }
      });
    });
  }
}
