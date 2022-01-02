import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { TransactionDetailsService } from 'src/app/shared/components/transaction-details/transaction-details.service';
import { Categories } from 'src/app/shared/interfaces/Categories.interface';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    transactions: any[] = [];
    filteredTransactions: any[] = [];
    categories: any;
    expenseCategories: any = [];
    incomeCategories: any = [];

    filterQueryFormGroup: FormGroup = new FormGroup({
        title: new FormControl(''),
        sort: new FormControl({ order: 'Desc', query: 'date' }),
    });
    expenses: FormControl = new FormControl([]);
    incomes: FormControl = new FormControl([]);

    constructor(
        private _transactionsService: TransactionsService,
        private _categoriesService: CategoriesService,
        private _transactionService: TransactionDetailsService
    ) {}

    ngOnInit(): void {
        this._categoriesService.categories.subscribe((categories: Categories) => {
            this.categories = categories;
            for (const [key, value] of Object.entries(categories)) {
                if (value.type === 'expense') {
                    this.expenseCategories.push({ ...value, id: key });
                    this.expenses.setValue([...this.expenses.value, key]);
                } else {
                    this.incomeCategories.push({ ...value, id: key });
                    this.incomes.setValue([...this.incomes.value, key]);
                }
            }
            this.categories = categories;
        });

        this._transactionsService.transactions.subscribe((transactions) => {
            if (transactions) {
                this.transactions = transactions;
                this.filterTransactions(transactions);
            }
        });

        merge(this.filterQueryFormGroup.valueChanges, this.expenses.valueChanges, this.incomes.valueChanges)
            .pipe(debounceTime(300))
            .subscribe(() => {
                this.filterTransactions(this.transactions);
            });
    }

    filterTransactions(transactions: any): void {
        this.filteredTransactions = this._transactionsService.filterTransactions(
            transactions,
            this.filterQueryFormGroup.controls['sort'].value,
            this.filterQueryFormGroup.value,
            this.expenses.value,
            this.incomes.value
        );
    }

    openTransactionDetails(transaction: any): void {
        let categories = this.categories;
        this._transactionService.open({ transaction, categories });
    }
}
