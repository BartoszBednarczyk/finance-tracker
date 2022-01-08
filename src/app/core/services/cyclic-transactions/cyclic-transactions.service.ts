import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class CyclicTransactionsService {
    uid: string = '';
    cyclicTransactions: Observable<any> = new Observable();

    constructor(private af: AngularFirestore) {}

    getCyclicTransactions(uid: string): void {
        // TODO: Sprawdzać czy jest pusty
        this.uid = uid;
        this.cyclicTransactions = this.af.collection<any>(uid).doc('cyclicTransactions').valueChanges();
    }

    addCyclicTransaction(transaction: any): void {
        console.log(transaction);
        let ref = this.af.collection(this.uid).doc('cyclicTransactions');

        let id = uuid();
        ref.update({
            [id]: {
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                date: new Date(transaction.date),
                category: transaction.category,
                cycle: transaction.cycle,
                lastDate: new Date(transaction.date),
            },
        });
    }

    deleteCyclicTransaction(id: string): void {
        let ref = this.af.collection(this.uid).doc('cyclicTransactions');
        let newCT: any = {};
        let sub = this.cyclicTransactions.subscribe((data) => {
            newCT = data;
            delete newCT[id];
            ref.set(newCT);
            sub.unsubscribe();
        });
    }
}
