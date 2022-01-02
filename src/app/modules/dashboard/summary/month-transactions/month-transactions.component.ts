import { Component, OnInit } from '@angular/core';
import { ApexChart } from 'ng-apexcharts';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';

import * as dayjs from 'dayjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Categories } from 'src/app/shared/interfaces/Categories.interface';
import { Category } from 'src/app/shared/interfaces/Category.interface';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-month-transactions',
    templateUrl: './month-transactions.component.html',
    styleUrls: ['./month-transactions.component.scss'],
})
export class MonthTransactionsComponent implements OnInit {
    chartOptions: any;
    transactions: any[] = [];
    expenseCategories: any = {};
    monthTotal = 0;

    constructor(private _transactionsService: TransactionsService, private _categoriesService: CategoriesService) {
        this._categoriesService.categories.subscribe((categories: Categories) => {
            this.initExpenseCategories(categories);
        });
        this._transactionsService.transactions.pipe(debounceTime(500)).subscribe((transactions) => {
            if (transactions) {
                this.transactions = _transactionsService.thisMonthTransactions(transactions);
                this.addDataToChart();
                console.log('Halo');
            }
        });

        this.chartOptions = {
            series: [],
            chart: {
                type: 'donut',
            },
            labels: [],
            legend: {
                show: false,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            show: false,
                        },
                    },
                },
            ],
        };
    }

    ngOnInit(): void {}

    initExpenseCategories(categories: Category): void {
        if (categories) {
            for (const [key, value] of Object.entries(categories)) {
                if (value.type === 'expense') {
                    let category = { name: value.name, icon: value.icon, amount: 0 };
                    this.expenseCategories[key] = category;
                }
            }
            this.expenseCategories['deleted'] = { name: 'Deleted', icon: '❓', amount: 0 };
        }
    }

    addDataToChart(): void {
        if (this.expenseCategories != {}) {
            for (const [key, value] of Object.entries(this.expenseCategories)) {
                this.expenseCategories[key].amount = 0;
            }
            this.transactions.map((transaction: any) => {
                if (transaction.value.type === 'expense') {
                    if (this.expenseCategories.hasOwnProperty(transaction.value.category)) {
                        this.expenseCategories[transaction.value.category].amount += transaction.value.amount;
                    } else {
                        this.expenseCategories.deleted.amount += transaction.value.amount;
                    }
                }
            });
        }
        console.log(this.expenseCategories);

        let series = [];
        let labels = [];
        this.monthTotal = 0;
        let key, value: any;
        for ([key, value] of Object.entries(this.expenseCategories)) {
            labels.push(`${value.icon} ${value.name}`);
            series.push(value.amount);
            this.monthTotal += value.amount;
        }

        console.log(series, labels);
        this.chartOptions = { ...this.chartOptions, series, labels };
    }
}
