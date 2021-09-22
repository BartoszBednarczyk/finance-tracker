import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { loginForm } from 'src/app/shared/interfaces/LoginForm.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private _authService: AuthService, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {
    if(field === 'email') {
      if (this.loginForm.controls['email'].hasError('required')) {
        return 'Musisz wprowadzić wartość';
      }
      return this.loginForm.controls['email'].hasError('email')
      ? 'Niepoprawny email'
      : '';
    } else {
        return "Password can't be empty"
    }
  }

  onLogin(): void {
    let formData = this.loginForm.value;
    this.signIn(formData);
  }

  signIn(formData: loginForm): void {
    this._authService.signIn(formData.email, formData.password).subscribe(res => {
      console.log(res);
      this._router.navigate([''])
    })
  }

  // testing methods below

  signUp(): void {
    this._authService.signUp('aaa@gmail.com', '123123').subscribe(res => {
      console.log(res);
    })
  }

  checkId(): void {
    console.log(this._authService.currentUserId);
  }


  signOut(): void {
    this._authService.signOut().subscribe(res => {
      console.log(res);
    })
  }

  test(): void {
    this._userService.getUser(this._authService.currentUserId).subscribe(res => console.log(res.data()))
    console.log(this._userService.user)
  }

}
