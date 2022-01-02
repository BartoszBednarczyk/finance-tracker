import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';

@Component({
    selector: 'app-transactions-of-year',
    templateUrl: './transactions-of-year.component.html',
    styleUrls: ['./transactions-of-year.component.scss'],
})
export class TransactionsOfYearComponent implements OnInit {
    balance: number = 0;
    constructor(private _transactionsService: TransactionsService) {
        this._transactionsService.transactions.subscribe((transactions) => {
            this.balance = this._transactionsService.getTotalBalance(transactions);
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
        yaxis: {
            min: 0,
        },
    };
    ngOnInit(): void {
        this.chartAreaSparkline3Options = {
            series: [
                {
                    name: 'chart-big-sparkline',
                    data: this.randomizeArray(this.sparkLineData),
                },
            ],
            title: {
                text: '$135,965',
                offsetX: 0,
                style: {
                    fontSize: '24px',
                },
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

    public randomizeArray(arg: any): number[] {
        var array = arg.slice();
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
