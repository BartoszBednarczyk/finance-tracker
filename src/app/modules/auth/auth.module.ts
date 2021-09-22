import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component'
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class AuthModule { }
