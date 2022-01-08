import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './core/services/transactions/transactions.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'finance-tracker';

    constructor(private _transactionsService: TransactionsService) {}

    ngOnInit(): void {
        speechSynthesis.addEventListener('voiceschanged', () => {
            const voices = speechSynthesis.getVoices();
            this._transactionsService.voices = voices;
        });
    }
}
