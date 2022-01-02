import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { Categories } from 'src/app/shared/interfaces/Categories.interface';

@Component({
    selector: 'app-add-transactions',
    templateUrl: './add-transactions.component.html',
    styleUrls: ['./add-transactions.component.scss'],
})
export class AddTransactionsComponent implements OnInit {
    addForm = new FormGroup({
        title: new FormControl(''),
        type: new FormControl('expense'),
        category: new FormControl(''),
        amount: new FormControl(0),
        date: new FormControl(new Date()),
        description: new FormControl(''),
    });

    expenseCategories: any[] = [];
    incomeCategories: any[] = [];

    balance: number = 0;

    constructor(private _categoriesService: CategoriesService, private _transactionsService: TransactionsService) {}

    ngOnInit(): void {
        this._categoriesService.categories.subscribe((categories: Categories) => {
            this.expenseCategories = [];
            this.incomeCategories = [];
            if (categories) {
                for (const [key, value] of Object.entries(categories)) {
                    if (value.type === 'expense') {
                        this.expenseCategories.push({ value, id: key });
                    } else if (value.type === 'income') {
                        this.incomeCategories.push({ value, id: key });
                    }
                }
            }
        });

        this._transactionsService.transactions.subscribe((transactions: any) => {
            this.balance = this._transactionsService.getTotalBalance(transactions);
        });
    }

    addTransaction() {
        console.log(this.addForm.value);
        this._transactionsService.addTransaction(this.addForm.value);
    }
}
