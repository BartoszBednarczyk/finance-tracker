import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  uid: string = '';
  transactions: Observable<any> = new Observable();

  constructor(private afTransactions: AngularFirestore) { }

  getTransactions(uid: string): void {
    // TODO: Sprawdzać czy jest pusty
    this.uid = uid;
    this.transactions = this.afTransactions.collection<any>(uid).doc('transactions').valueChanges();
  }
}
