import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { isEmpty, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  authState: any = null;
  constructor(private _router: Router,private _angularFireAuth: AngularFireAuth, private _userService: UserService, private _transactionsService: TransactionsService, private _categoriesService: CategoriesService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this._angularFireAuth.authState.pipe(map(auth => {
        if (auth) {
          if(this._transactionsService.transactions.pipe(isEmpty())) {
            this._transactionsService.getTransactions(auth.uid);
          }
          if(this._categoriesService.categories.pipe(isEmpty())) {
            this._categoriesService.getCategories(auth.uid);
          }
          
          this._userService.getUser(auth.uid);
          return true;
        } else {
          this._router.navigate(['auth/login']);
          return false;
        }
      }))
  }
  
}
