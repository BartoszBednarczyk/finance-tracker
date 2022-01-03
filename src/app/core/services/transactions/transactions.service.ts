import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
    fillForm = new Subject<any>();
    fillForm$ = this.fillForm.asObservable();

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

    fillTransactionForm(transaction: any): void {
        this.fillForm.next(transaction);
    }

    howMuchOnCategory(data: any): string {
        let transactions = this.filterTransactions(
            data.transactions,
            { order: 'Asc', query: 'date' },
            { title: '', sort: { order: 'Asc', query: 'date' } },
            [data.category],
            []
        );
        let sum = 0;
        transactions.map((transaction: any) => {
            if (new Date(transaction.value.date.toDate()) >= new Date(data.date)) {
                sum += transaction.value.amount;
            }
        });
        return `You've spent $${sum} on ${data.entityCategory} from ${data.date}`;
    }

    howMuchTotally(data: any): string {
        let sum = 0;
        let transactions = data.transactions;
        console.log(transactions);
        for (const [key, value] of Object.entries(transactions)) {
            //@ts-expect-error
            if (new Date(value.date.toDate()) >= new Date(data.date)) {
                //@ts-expect-error
                sum += value.amount;
            }
        }
        return `You've spent $${sum} from ${data.date}`;
    }

    howMuchOnAverageCategory(data: any): string {
        let sum = 0;
        let transactions = this.filterTransactions(
            data.transactions,
            { order: 'Desc', query: 'date' },
            { title: '', sort: { order: 'Desc', query: 'date' } },
            [data.category],
            []
        );
        let firstDate = dayjs(transactions[0].value.date.toDate());
        let lastDate = dayjs(transactions[transactions.length - 1].value.date.toDate());
        let period: 'month' | 'day' | 'week' | 'year' = 'month';
        switch (data.period) {
            case 'DAILY':
                period = 'day';
                break;
            case 'WEEKLY':
                period = 'week';
                break;
            case 'MONTHLY':
                period = 'month';
                break;
            case 'ANNUALLY':
                period = 'year';
                break;
        }
        let difference = Math.ceil(firstDate.diff(lastDate, period, true));
        if (difference == 0) difference = 1;
        transactions.map((transaction: any) => {
            sum += transaction.value.amount;
        });
        const average = Math.ceil(sum / difference);
        return `You spend $${average} on ${data.entityCategory} ${data.period} `;
    }

    howMuchOnAverageTotally(data: any): string {
        let sum = 0;
        let transactions = this.filterTransactions(
            data.transactions,
            { order: 'Desc', query: 'date' },
            { title: '', sort: { order: 'Desc', query: 'date' } },
            data.expenseCategories,
            []
        );
        console.log(data);
        console.log(transactions);
        let firstDate = dayjs(transactions[0].value.date.toDate());
        let lastDate = dayjs(transactions[transactions.length - 1].value.date.toDate());
        let period: 'month' | 'day' | 'week' | 'year' = 'month';
        switch (data.period) {
            case 'DAILY':
                period = 'day';
                break;
            case 'WEEKLY':
                period = 'week';
                break;
            case 'MONTHLY':
                period = 'month';
                break;
            case 'ANNUALLY':
                period = 'year';
                break;
        }
        let difference = Math.ceil(firstDate.diff(lastDate, period, true));
        if (difference == 0) difference = 1;
        transactions.map((transaction: any) => {
            sum += transaction.value.amount;
        });
        const average = Math.ceil(sum / difference);
        return `You spend $${average} ${data.period} `;
    }
}
