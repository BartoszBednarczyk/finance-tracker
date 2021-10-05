import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/interfaces/User.interface';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any

  constructor(public dialog: MatDialog, private _userService: UserService, private _categoriesService: CategoriesService) { 
    this._userService.account.subscribe(val => {
      this.user = val;
      console.log(val);
    })

    this._categoriesService.categories.subscribe(val => {
      console.log(val);
    })
  }

  ngOnInit(): void {
    console.log(this._userService.user);
  }

  openDialog() {
    this.dialog.open(SettingsComponent, {
      width: 'auto',
      data: {
        animal: 'panda'
      }
    });
  }

}
