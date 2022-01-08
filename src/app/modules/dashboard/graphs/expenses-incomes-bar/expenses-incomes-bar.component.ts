import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-expenses-incomes-bar',
    templateUrl: './expenses-incomes-bar.component.html',
    styleUrls: ['./expenses-incomes-bar.component.scss'],
})
export class ExpensesIncomesBarComponent implements OnInit {
    balance: number = 0;
    transactions: any[] = [];
    chartInit = false;
    constructor(private _transactionsService: TransactionsService) {
        this._transactionsService.transactions.subscribe((transactions) => {
            this.balance = this._transactionsService.getTotalBalance(transactions);
            this.transactions = transactions;
            this.initChart();
        });
    }
    chartAreaSparkline3Options: any = {};
    public commonAreaSparlineOptions: Partial<any> = {
        chart: {
            type: 'bar',
            height: 'auto',
        },
        stroke: {
            curve: 'straight',
        },
        fill: {
            opacity: 1,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            title: {
                text: 'Amount',
            },
            min: 0,
        },
    };
    ngOnInit(): void {
        //this.initChart();
    }

    initChart(): void {
        let series = this.randomizeArray();
        console.log(series);
        this.chartAreaSparkline3Options = {
            series,
            title: {
                text: 'Daily incomes and expenses',
                offsetX: 0,
                style: {
                    fontSize: '14px',
                },
            },
            xaxis: {
                title: { text: 'Date' },
                type: 'datetime',
            },
            subtitle: {
                text: 'Profits',
                offsetX: 0,
                style: {
                    fontSize: '14px',
                },
            },
        };
    }

    public sparkLineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
    public addDataLabels(): any {
        let tempLabels = [];
        for (let i = 0; i < 10; i++) {
            tempLabels.unshift(dayjs().subtract(i, 'days'));
        }
        return tempLabels;
    }
    public randomizeArray(): any {
        let tempSerie = [];
        let tempLabels = [];
        let incomes = { name: 'Incomes', data: [] };
        let expenses = { name: 'Expenses', data: [] };
        let sortedTransactions = this._transactionsService.sortTransactions(this.transactions, { order: 'Asc', query: 'date' });
        console.log(sortedTransactions);
        let lastExpenseDate = '';
        let lastIncomesDate = '';
        sortedTransactions.map((trans: any) => {
            if (trans.value.type === 'expense') {
                let date = dayjs(trans.value.date.toDate()).format('MM-DD-YYYY');
                if (date === lastExpenseDate) {
                    //@ts-expect-error
                    expenses.data[expenses.data.length - 1][1] += trans.value.amount;
                } else {
                    //@ts-expect-error
                    expenses.data.push([date + ' GMT', trans.value.amount]);
                }
                lastExpenseDate = date;
            } else {
                let date = dayjs(trans.value.date.toDate()).format('MM-DD-YYYY');
                if (date === lastIncomesDate) {
                    //@ts-expect-error
                    incomes.data[incomes.data.length - 1][1] += trans.value.amount;
                } else {
                    //@ts-expect-error
                    incomes.data.push([date + ' GMT', trans.value.amount]);
                }
                lastIncomesDate = date;
            }
        });

        // for (const [key, value] of Object.entries(this.transactions)) {
        //     if (value.type === 'expense') {
        //         //@ts-expect-error
        //         expenses.data.push([dayjs(value.date.toDate()).format('MM-DD-YYYY'), value.amount]);
        //     } else {
        //         //@ts-expect-error
        //         incomes.data.push([dayjs(value.date.toDate()).format('MM-DD-YYYY'), value.amount]);
        //     }
        // }
        this.chartInit = true;
        tempSerie = [incomes, expenses];
        return tempSerie;
    }
}
