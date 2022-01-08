import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-transactions-of-year',
    templateUrl: './transactions-of-year.component.html',
    styleUrls: ['./transactions-of-year.component.scss'],
})
export class TransactionsOfYearComponent implements OnInit {
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
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: 'straight',
        },
        fill: {
            opacity: 0.3,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [],
        },
        yaxis: {
            min: 0,
        },
    };
    ngOnInit(): void {
        //this.initChart();
    }

    initChart(): void {
        let data = this.randomizeArray();
        console.log(data);
        this.chartAreaSparkline3Options = {
            series: [
                {
                    name: 'Expenses',
                    data: data.tempSerie ? data.tempSerie : [],
                },
            ],
            title: {
                text: 'Daily expenses',
                offsetX: 0,
                style: {
                    fontSize: '14px',
                },
            },
            xaxis: {
                categories: data.tempLabels ? data.tempLabels : [],
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

        for (let i = 0; i < 10; i++) {
            let tempBalance = 0;
            let currentDate = dayjs().subtract(i, 'days');
            tempLabels.unshift(currentDate.format('MM-DD'));

            for (const [key, value] of Object.entries(this.transactions)) {
                console.log(dayjs(value.date.toDate()).isSame(currentDate));
                if (dayjs(value.date.toDate()).isSame(currentDate, 'day')) {
                    if (value.type == 'expense') {
                        tempBalance += value.amount;
                    }
                }
            }
            tempSerie.unshift(tempBalance);

            if (i == 9) {
                this.chartInit = true;
                return { tempSerie, tempLabels, tempBalance };
            }
        }
    }
}
