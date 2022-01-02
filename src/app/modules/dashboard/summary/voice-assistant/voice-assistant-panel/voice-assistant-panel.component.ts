import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-voice-assistant-panel',
    templateUrl: './voice-assistant-panel.component.html',
    styleUrls: ['./voice-assistant-panel.component.scss'],
})
export class VoiceAssistantPanelComponent implements OnInit {
    text: string = '';
    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

    ngOnInit(): void {
        this.joinWords(this.data.words);

        console.log(this.data);
        this.checkIntent(this.data.intent);
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
        switch (data.intent) {
            case 'add_expense':
                this.addExpense(data);
                break;
        }
    }

    addExpense(data: any): void {
        console.log('expense added');
    }
}
