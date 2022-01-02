import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { Categories } from '../../interfaces/Categories.interface';

@Component({
    selector: 'app-transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
    transactionForm = new FormGroup({
        title: new FormControl(''),
        type: new FormControl('expense'),
        category: new FormControl(''),
        amount: new FormControl(0),
        date: new FormControl(new Date()),
        description: new FormControl(''),
    });

    expenseCategories: any[] = [];
    incomeCategories: any[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            id: any;
            title: any;
            type: any;
            category: any;
            amount: number;
            date: any;
            description: any;
            categories: Categories;
        },
        private mdDialogRef: MatDialogRef<TransactionDetailsComponent>,
        private _transactionsService: TransactionsService
    ) {
        this.expenseCategories = [];
        this.incomeCategories = [];
        if (data.categories) {
            for (const [key, value] of Object.entries(data.categories)) {
                if (value.type === 'expense') {
                    this.expenseCategories.push({ value, id: key });
                } else if (value.type === 'income') {
                    this.incomeCategories.push({ value, id: key });
                }
            }
        }
        this.transactionForm.controls['title'].setValue(data.title);
        this.transactionForm.controls['type'].setValue(data.type);
        this.transactionForm.controls['category'].setValue(data.category);
        this.transactionForm.controls['amount'].setValue(data.amount);
        this.transactionForm.controls['date'].setValue(dayjs(data.date.toDate()).format('YYYY-MM-DD'));
        this.transactionForm.controls['description'].setValue(data.description);
        console.log(dayjs(data.date.toDate()).format('YYYY-MM-DD'));
        console.log(this.data.categories);
    }

    updateTransaction(): void {
        this._transactionsService.updateTransaction({ ...this.transactionForm.value, id: this.data.id });
    }

    ngOnInit() {
        console.log(this.data);
    }

    public cancel() {
        this.close(false);
    }
    public close(value: any) {
        this.mdDialogRef.close(value);
    }
    public confirm() {
        this.close(true);
    }
    @HostListener('keydown.esc')
    public onEsc() {
        this.close(false);
    }
}
