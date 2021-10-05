import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  signUp() {
    let user = this.loginForm.value;
    this._auth.signUp(user.email, user.password, user.name).subscribe(res => {
      console.log(res);
    }, (err) => {console.log(err.message)})
  }


  getErrorMessage(field: string) {
    if(field === 'email') {
      if (this.loginForm.controls['email'].hasError('required')) {
        return 'Musisz wprowadzić wartość';
      }
      return this.loginForm.controls['email'].hasError('email')
      ? 'Niepoprawny email'
      : '';
    } else if (field === 'name') {
      return 'You have to type name'
    }
    else {
      if (this.loginForm.controls['name'].hasError('length')) {
        return "Password has to be longer than 6"
      } else {
        return "Password can't be empty"
      }
        
    }
  }
}
