import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this._authService.signOut().subscribe(res => {
      console.log(res);
    })
  }

  checkId(): void {
    console.log(this._authService.currentUserId);
  }

}
