import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { TransactionDetailsService } from 'src/app/shared/components/transaction-details/transaction-details.service';

@Component({
    selector: 'app-last-transactions',
    templateUrl: './last-transactions.component.html',
    styleUrls: ['./last-transactions.component.scss'],
})
export class LastTransactionsComponent implements OnInit {
    transactions: any[] = [];
    categories: any;

    constructor(
        private _transactionsService: TransactionsService,
        private _categoriesService: CategoriesService,
        private _transactionService: TransactionDetailsService
    ) {}

    ngOnInit(): void {
        this._categoriesService.categories.subscribe((categories) => {
            this.categories = categories;
        });

        this._transactionsService.transactions.subscribe((transactions) => {
            if (transactions) {
                this.transactions = this._transactionsService.sortTransactions(transactions);
            }
        });
    }

    openTransactionDetails(transaction: any): void {
        let categories = this.categories;
        this._transactionService.open({ transaction, categories });
    }
}
