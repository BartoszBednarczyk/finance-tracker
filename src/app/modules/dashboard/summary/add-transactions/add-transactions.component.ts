import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    @Input() isCyclic = false;
    @Output() closeDialog: EventEmitter<any> = new EventEmitter();
    addForm = new FormGroup({
        title: new FormControl(''),
        type: new FormControl('expense'),
        category: new FormControl(''),
        amount: new FormControl(0),
        date: new FormControl(new Date()),
        description: new FormControl(''),
        cycle: new FormControl(''),
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

        this._transactionsService.fillForm$.subscribe((transaction) => {
            this.addForm.controls['type'].setValue(transaction.type);
            this.addForm.controls['category'].setValue(transaction.category);
            this.addForm.controls['date'].setValue(transaction.date);
            this.addForm.controls['amount'].setValue(transaction.amount);
        });
    }

    addTransaction() {
        if (this.isCyclic) {
            this.addCyclicTransaction();
        } else {
            console.log(this.addForm.value);
            this._transactionsService.addTransaction(this.addForm.value);
        }
    }

    addCyclicTransaction() {
        console.log('Added cyclic transaction');
        this.closeDialog.emit({ form: this.addForm.value });
    }
}
