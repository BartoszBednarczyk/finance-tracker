import { Component, OnInit } from '@angular/core';
import { Client, ClientState, stateToString, Word, Entity, Intent, ClientOptions, Segment } from '@speechly/browser-client';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { VoiceAssistantPanelComponent } from './voice-assistant-panel/voice-assistant-panel.component';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Categories } from 'src/app/shared/interfaces/Categories.interface';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';

@Component({
    selector: 'app-voice-assistant',
    templateUrl: './voice-assistant.component.html',
    styleUrls: ['./voice-assistant.component.scss'],
})
export class VoiceAssistantComponent implements OnInit {
    clientState = ClientState.Disconnected;
    client!: Client;
    text: string = '';
    expenseCategories: any[] = [];
    incomeCategories: any[] = [];
    transactions: any[] = [];
    isLoaderVisible = false;
    constructor(private _bottomSheet: MatBottomSheet, private _categoriesService: CategoriesService, private _transactionsService: TransactionsService) {
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

        this._transactionsService.transactions.subscribe((data) => (this.transactions = data));
    }

    ngOnInit(): void {
        this.client = new Client({
            appId: '4dce5399-e4d4-45cf-9b30-fef378a3420c',
            language: 'en-US',
        });
        this.client.initialize();
        this.client.onSegmentChange((segment) => {
            if (segment.intent && segment.isFinal) {
                this.joinWords(segment.words);
                this.openBottomSheet(segment);
            }
        });
    }
    openBottomSheet(data: any): void {
        this._bottomSheet.open(VoiceAssistantPanelComponent, {
            data: { data, incomeCategories: this.incomeCategories, expenseCategories: this.expenseCategories, transactions: this.transactions },
        });
    }

    joinWords(words: any): void {
        if (words) {
            this.text = '';
            words.map((word: any) => {
                this.text += ' ' + word.value;
            });
        }
    }

    newClient(): Client {
        const appId = '4dce5399-e4d4-45cf-9b30-fef378a3420c';
        const language = 'en-US';
        const opts: ClientOptions = {
            appId,
            language,
            debug: true,
            // Enabling logSegments logs the updates to segment (transcript, intent and entities) to console.
            // Consider turning it off in the production as it has extra JSON.stringify operation.
            logSegments: true,
        };

        return new Client(opts);
    }

    onMouseDown(): void {
        console.log('Pressed');
        this.isLoaderVisible = true;
        this.client.startContext();
    }

    onMouseUp(): void {
        console.log('Freed');
        this.isLoaderVisible = false;
        this.client.stopContext();
    }
}
