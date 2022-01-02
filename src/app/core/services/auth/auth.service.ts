import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { exhaustMap, switchMap, tap } from 'rxjs/operators';
import { IsSignedInGuard } from 'src/app/shared/guards/is-signed-in.guard';
import { User } from '../../../shared/interfaces/User.interface';
import { UserCredential, UserFirebase } from '../../../shared/types/firebase.type';
import { UserService } from '../user/user.service';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authState: any = null;

    constructor(public angularFireAuth: AngularFireAuth, private userService: UserService, private _guard: IsSignedInGuard) {
        this.angularFireAuth.authState.subscribe((authState) => {
            this.authState = authState;
        });
    }

    get isAuthenticated(): boolean {
        return this.authState !== null;
    }

    get currentUserId(): string {
        return this.isAuthenticated ? this.authState.uid : null;
    }

    signIn(email: string, password: string): Observable<DocumentSnapshot<User>> {
        return from(this.angularFireAuth.signInWithEmailAndPassword(email, password)).pipe(
            tap((userCredential) => {
                this.userService.user = userCredential.user;
            }),
            switchMap((userCredential) => this.userService.getUser(userCredential.user?.uid as string))
        );
    }

    signUp(email: string, password: string, name: string): Observable<void> {
        return from(this.angularFireAuth.createUserWithEmailAndPassword(email, password)).pipe(
            tap((userCredential) => {
                this.userService.user = userCredential.user;
            }),
            switchMap((userCredential) => this.userService.createUser(userCredential.user?.uid, { name: name, email: email }))
        );
    }

    signOut(): Observable<UserFirebase | null> {
        this.userService.uid = '';
        this.authState = null;
        this._guard.loggedOff = true;
        return from(this.angularFireAuth.signOut()).pipe(exhaustMap(() => this.angularFireAuth.user));
    }
}
