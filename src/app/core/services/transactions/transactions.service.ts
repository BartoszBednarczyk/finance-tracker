import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
import { Category } from 'src/app/shared/interfaces/Category.interface';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    uid: string = '';
    transactions: Observable<any> = new Observable();
    sortedTransactions: any = [];

    constructor(private afTransactions: AngularFirestore) {}

    getTransactions(uid: string): void {
        // TODO: Sprawdzać czy jest pusty
        this.uid = uid;

        this.transactions = this.afTransactions.collection<any>(uid).doc('transactions').valueChanges();
    }

    getTotalBalance(transactions: Category): number {
        let balance = 0;
        console.log(transactions);
        for (const [key, value] of Object.entries(transactions)) {
            if (value.type == 'expense') {
                balance -= value.amount;
            } else {
                balance += value.amount;
            }
        }
        return balance;
    }

    sortTransactions(transactions: any, sortQuery?: any): any {
        let sortedTransactions: any = [];
        if (sortQuery) {
            for (const [key, value] of Object.entries(transactions)) {
                sortedTransactions.push({ value, id: key });
            }

            sortedTransactions = sortedTransactions.sort((a: any, b: any) => {
                if (sortQuery.order === 'Asc') {
                    if (sortQuery.query === 'date') {
                        return a.value.date.seconds < b.value.date.seconds ? -1 : b.value.date.seconds < a.value.date.seconds ? 1 : 0;
                    } else {
                        return a.value.amount > b.value.amount ? -1 : b.value.amount > a.value.amount ? 1 : 0;
                    }
                } else {
                    if (sortQuery.query === 'date') {
                        return a.value.date.seconds > b.value.date.seconds ? -1 : b.value.date.seconds > a.value.date.seconds ? 1 : 0;
                    } else {
                        return a.value.amount < b.value.amount ? -1 : b.value.amount < a.value.amount ? 1 : 0;
                    }
                }
            });

            return sortedTransactions;
        } else {
            for (const [key, value] of Object.entries(transactions)) {
                sortedTransactions.push({ value, id: key });
            }
            sortedTransactions = sortedTransactions.sort((a: any, b: any) =>
                a.value.date.seconds > b.value.date.seconds ? -1 : b.value.date.seconds > a.value.date.seconds ? 1 : 0
            );
            return sortedTransactions;
        }
    }

    filterTransactions(transactions: any, sortQuery: any, filterQuery: any, expenses: any, incomes: any): any {
        let filteredTransactions: any = {};
        for (const [key, value] of Object.entries(transactions)) {
            if (filterQuery.title != '') {
                //@ts-expect-error
                if (value.title.toString().toLowerCase().includes(filterQuery.title.toLowerCase())) {
                    filteredTransactions[key] = value;
                }
            } else {
                filteredTransactions[key] = value;
            }
        }
        let newFilteredTransactions: any = {};
        for (const [key, value] of Object.entries(filteredTransactions)) {
            //@ts-expect-error
            if (expenses.includes(value.category) || incomes.includes(value.category)) {
                newFilteredTransactions[key] = value;
            }
        }
        newFilteredTransactions = this.sortTransactions(newFilteredTransactions, sortQuery);
        return newFilteredTransactions;
    }

    thisMonthTransactions(transactions: any): any {
        let sortedTransactions = this.sortTransactions(transactions, { order: 'Asc', query: 'date' });
        let thisMonthTransactions: any = [];
        sortedTransactions.map((transaction: any) => {
            if (dayjs(transaction.value.date.toDate()).month() == dayjs().month()) {
                thisMonthTransactions.push(transaction);
            }
        });
        console.log(thisMonthTransactions);
        return thisMonthTransactions;
    }

    addTransaction(transaction: any): void {
        let ref = this.afTransactions.collection(this.uid).doc('transactions');

        let id = uuid();
        ref.update({
            [id]: {
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                date: new Date(transaction.date),
                category: transaction.category,
                description: transaction.description,
            },
        });
    }

    updateTransaction(transaction: any): void {
        let ref = this.afTransactions.collection(this.uid).doc('transactions');
        console.log(transaction);
        ref.update({
            [transaction.id]: {
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                date: new Date(transaction.date),
                category: transaction.category,
                description: transaction.description,
            },
        });
    }
}
