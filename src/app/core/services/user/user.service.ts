import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { User } from '../../../shared/interfaces/User.interface';
import { UserFirebase } from '../../../shared/types/firebase.type';
import { AuthService } from '../auth/auth.service';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid: string = '';
  account: Observable<any> = new Observable();

  constructor(private afUser: AngularFirestore) {
    
  }

   

  private _user: UserFirebase | null = null;

  get user(): UserFirebase | null {
    return this._user
  }

  set user(newUser: UserFirebase | null) {
    this._user = newUser;
  }

  createUser(uid: string | undefined, user: User): Promise<void> {
    return this.afUser.collection(uid!).doc('account').set({
      name: user.name,
      email: user.email,
      categories: user.categories,
    });
  }

  getUsers(): Observable<QuerySnapshot<User>> {
    return this.afUser.collection<User>('users').get();
  }

  getUser(uid: string): Observable<DocumentSnapshot<User>> {
    // TODO: Sprawdzać czy jest pusty
    this.uid = uid;
    this.account = this.afUser.collection<User>(uid).doc('account').valueChanges();
    return this.account;
  }
}
