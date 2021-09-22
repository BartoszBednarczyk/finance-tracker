import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  authState: any = null;
  constructor(private _router: Router,private _angularFireAuth: AngularFireAuth){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this._angularFireAuth.authState.pipe(map(auth => {
        if (auth) {
          return true;
        } else {
          this._router.navigate(['auth/login']);
          return false;
        }
      }))
  }
  
}
