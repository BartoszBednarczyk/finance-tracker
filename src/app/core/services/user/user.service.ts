import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces/User.interface';
import { UserFirebase } from '../../../shared/types/firebase.type';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afUser: AngularFirestore) {}

  private _user: UserFirebase | null = null;

  get user(): UserFirebase | null {
    return this._user
  }

  set user(newUser: UserFirebase | null) {
    this._user = newUser;
  }

  createUser(uid: string | undefined, user: User): Promise<void> {
    return this.afUser.collection('users').doc(uid).set({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    });
  }

  getUsers(): Observable<QuerySnapshot<User>> {
    return this.afUser.collection<User>('users').get();
  }

  getUser(uid: string): Observable<DocumentSnapshot<User>> {
    return this.afUser.collection<User>('users').doc(uid).get();
  }
}
