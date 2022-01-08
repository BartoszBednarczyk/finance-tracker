import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { RemindDialogComponent } from '../../alert-buttons/remind-dialog/remind-dialog.component';

@Component({
    selector: 'app-voice-assistant-panel',
    templateUrl: './voice-assistant-panel.component.html',
    styleUrls: ['./voice-assistant-panel.component.scss'],
})
export class VoiceAssistantPanelComponent implements OnInit {
    text: string = '';
    info: string = '';
    expenseCategories: any[] = [];
    incomeCategories: any[] = [];
    transactions: any[] = [];
    synth: SpeechSynthesis;
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        public dialog: MatDialog,
        private _router: Router,
        private _transactionsService: TransactionsService
    ) {
        this.expenseCategories = data.expenseCategories;
        this.incomeCategories = data.incomeCategories;
        this.transactions = data.transactions;
        this.synth = window.speechSynthesis;
    }

    ngOnInit(): void {
        this.joinWords(this.data.data.words);

        console.log(this.data);
        this.checkIntent(this.data.data);
    }

    joinWords(words: any): void {
        if (words) {
            this.text = '';
            words.map((word: any) => {
                this.text += ' ' + word.value;
            });
        }
    }

    checkIntent(data: any): void {
        switch (data.intent.intent) {
            case 'add_expense':
                this.addExpense(data);
                break;
            case 'add_income':
                this.addIncome(data);
                break;
            case 'create_reminder':
                this.createReminder(data);
                break;
            case 'show_transactions':
                this.showTransactions();
                break;
            case 'how_much_on_category':
                this.howMuchOnCategory(data);
                break;
            case 'how_much_on_average_category':
                this.howMuchOnAverageCategory(data);
                break;
            case 'how_much_totally':
                this.howMuchTotally(data);
                break;
            case 'how_much_on_average_totally':
                this.howMuchOnAverageTotally(data);
                break;
        }
        this.speak();
    }

    addExpense(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'amount')) {
            this.info = "We couldn't understand amount. Please try again!";
        } else if (!data.entities.some((entity: any) => entity.type == 'category')) {
            this.info = "We couldn't understand category. Please try again!";
        } else if (!data.entities.some((entity: any) => entity.type == 'date')) {
            this.info = "We couldn't understand date. Please try again!";
        } else {
            const entityCategoryIndex = data.entities.findIndex((entity: any) => entity.type == 'category');
            const entityCategory = data.entities[entityCategoryIndex].value;
            if (!this.expenseCategories.some((category) => category.value.name.toUpperCase() == entityCategory)) {
                this.info = "We couldn't find category with this name. Please try again!";
            } else {
                console.log(this.expenseCategories);
                const type = 'expense';
                const categoryIndex = this.expenseCategories.findIndex((category) => category.value.name.toUpperCase() == entityCategory);
                const dateIndex = data.entities.findIndex((entity: any) => entity.type == 'date');
                const amountIndex = data.entities.findIndex((entity: any) => entity.type == 'amount');
                const category = this.expenseCategories[categoryIndex].id;
                const amount = +data.entities[amountIndex].value;
                const date = data.entities[dateIndex].value;
                this._transactionsService.fillTransactionForm({ type, category, amount, date });
                this.info = 'The form has been filled. Please validate your data and if everything is ok - click button!';
            }
        }
    }

    addIncome(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'amount')) {
            this.info = "We couldn't understand amount. Please try again!";
        } else if (!data.entities.some((entity: any) => entity.type == 'category')) {
            this.info = "We couldn't understand category. Please try again!";
        } else if (!data.entities.some((entity: any) => entity.type == 'date')) {
            this.info = "We couldn't understand date. Please try again!";
        } else {
            const entityCategoryIndex = data.entities.findIndex((entity: any) => entity.type == 'category');
            const entityCategory = data.entities[entityCategoryIndex].value;
            if (!this.incomeCategories.some((category) => category.value.name.toUpperCase() == entityCategory)) {
                this.info = "We couldn't find category with this name. Please try again!";
            } else {
                console.log(this.incomeCategories);
                const type = 'income';
                const categoryIndex = this.incomeCategories.findIndex((category) => category.value.name.toUpperCase() == entityCategory);
                const dateIndex = data.entities.findIndex((entity: any) => entity.type == 'date');
                const amountIndex = data.entities.findIndex((entity: any) => entity.type == 'amount');
                const category = this.incomeCategories[categoryIndex].id;
                const amount = +data.entities[amountIndex].value;
                const date = data.entities[dateIndex].value;
                this._transactionsService.fillTransactionForm({ type, category, amount, date });
                this.info = 'The form has been filled. Please validate your data and if everything is ok - click button!';
            }
        }
    }

    createReminder(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'reminder_name')) {
            this.info = "Sorry, we couldn't find title. Please try again";
        } else if (!data.entities.some((entity: any) => entity.type == 'date')) {
            this.info = "Sorry, we couldn't understand date. Please try again";
        } else {
            this.info = 'The dialog should appear now. Please validate your data and if everything is ok - click button!';
            this.dialog.open(RemindDialogComponent, {
                width: 'auto',
                data,
            });
        }
    }

    showTransactions(): void {
        this.info = 'There is a list of your all transactions!';
        this._router.navigate(['dashboard/history']);
    }

    howMuchOnCategory(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'date')) {
            this.info = "We couldn't understand date. Please try again!";
        } else if (!data.entities.some((entity: any) => entity.type == 'category')) {
            this.info = "We couldn't understand category. Please try again!";
        } else {
            const entityCategoryIndex = data.entities.findIndex((entity: any) => entity.type == 'category');
            const entityCategory = data.entities[entityCategoryIndex].value;
            if (this.incomeCategories.some((category) => category.value.name.toUpperCase() == entityCategory)) {
                const categoryIndex = this.incomeCategories.findIndex((category) => category.value.name.toUpperCase() == entityCategory);
                const dateIndex = data.entities.findIndex((entity: any) => entity.type == 'date');
                const category = this.incomeCategories[categoryIndex].id;
                const date = data.entities[dateIndex].value;
            } else if (this.expenseCategories.some((category) => category.value.name.toUpperCase() == entityCategory)) {
                const categoryIndex = this.expenseCategories.findIndex((category) => category.value.name.toUpperCase() == entityCategory);
                const dateIndex = data.entities.findIndex((entity: any) => entity.type == 'date');
                const category = this.expenseCategories[categoryIndex].id;
                const date = data.entities[dateIndex].value;
                this.info = this._transactionsService.howMuchOnCategory({ date, category, entityCategory, transactions: this.transactions });
            } else {
                this.info = "We couldn't find category with this name. Please try again!";
            }
        }
    }

    howMuchOnAverageCategory(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'time_period')) {
            this.info = "We couldn't understand time period. Please try again!";
        } else if (!data.entities.some((entity: any) => entity.type == 'category')) {
            this.info = "We couldn't understand category. Please try again!";
        } else {
            const entityCategoryIndex = data.entities.findIndex((entity: any) => entity.type == 'category');
            const entityCategory = data.entities[entityCategoryIndex].value;
            if (this.incomeCategories.some((category) => category.value.name.toUpperCase() == entityCategory)) {
                const categoryIndex = this.incomeCategories.findIndex((category) => category.value.name.toUpperCase() == entityCategory);
                const periodIndex = data.entities.findIndex((entity: any) => entity.type == 'time_period');
                const category = this.incomeCategories[categoryIndex].id;
                const period = data.entities[periodIndex].value;
            } else if (this.expenseCategories.some((category) => category.value.name.toUpperCase() == entityCategory)) {
                const categoryIndex = this.expenseCategories.findIndex((category) => category.value.name.toUpperCase() == entityCategory);
                const periodIndex = data.entities.findIndex((entity: any) => entity.type == 'time_period');
                const category = this.expenseCategories[categoryIndex].id;
                const period = data.entities[periodIndex].value;
                this.info = this._transactionsService.howMuchOnAverageCategory({ period, category, entityCategory, transactions: this.transactions });
            } else {
                this.info = "We couldn't find category with this name. Please try again!";
            }
        }
    }

    howMuchTotally(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'date')) {
            this.info = "We couldn't understand date. Please try again!";
        } else {
            const dateIndex = data.entities.findIndex((entity: any) => entity.type == 'date');
            const date = data.entities[dateIndex].value;
            this.info = this._transactionsService.howMuchTotally({ date, transactions: this.transactions });
        }
    }

    howMuchOnAverageTotally(data: any): void {
        if (!data.entities.some((entity: any) => entity.type == 'time_period')) {
            this.info = "We couldn't understand time period. Please try again!";
        } else {
            const periodIndex = data.entities.findIndex((entity: any) => entity.type == 'time_period');
            const period = data.entities[periodIndex].value;
            let expenseCategories = this.expenseCategories.map((cat) => cat.id);
            this.info = this._transactionsService.howMuchOnAverageTotally({
                period,
                transactions: this.transactions,
                expenseCategories,
            });
        }
    }

    speak(): void {
        let utterance = new SpeechSynthesisUtterance(this.info);
        let voice = this._transactionsService.voices.filter((voice: SpeechSynthesisVoice) => voice.name == 'Google US English');
        if (voice.length) {
            utterance.voice = voice[0];
        }
        speechSynthesis.speak(utterance);
    }
}
