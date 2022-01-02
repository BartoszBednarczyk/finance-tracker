import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

@Component({
    selector: 'app-remind-dialog',
    templateUrl: './remind-dialog.component.html',
    styleUrls: ['./remind-dialog.component.scss'],
})
export class RemindDialogComponent implements OnInit {
    form: FormGroup = new FormGroup({
        title: new FormControl(''),
        date: new FormControl(''),
    });
    constructor(private _alertsService: AlertsService) {}

    ngOnInit(): void {}

    addReminder(): void {
        this._alertsService.createAlert(this.form.value);
    }
}
