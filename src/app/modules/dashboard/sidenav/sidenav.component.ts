import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {
   
  }

  ngOnInit(): void {

  }


  // FIXME: redirect to root
  signOut(): void {
    this._authService.signOut();
    this._router.navigateByUrl('/');
  }

}
