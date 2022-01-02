import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SummaryComponent } from './summary/summary.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HistoryComponent } from './history/history.component';
import { HeaderComponent } from './summary/header/header.component';
import { AddTransactionsComponent } from './summary/add-transactions/add-transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LastTransactionsComponent } from './summary/last-transactions/last-transactions.component';
import { LastTransactionsItemComponent } from './summary/last-transactions/last-transactions-item/last-transactions-item.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { SettingsComponent } from './summary/settings/settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NgxEmojModule } from 'ngx-emoj';
import { VoiceAssistantComponent } from './summary/voice-assistant/voice-assistant.component';
import { TransactionsOfYearComponent } from './summary/transactions-of-year/transactions-of-year.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MonthTransactionsComponent } from './summary/month-transactions/month-transactions.component';
import { AlertButtonsComponent } from './summary/alert-buttons/alert-buttons.component';
import { TransactionDetailsModule } from 'src/app/shared/components/transaction-details/transaction-details.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { RemindDialogComponent } from './summary/alert-buttons/remind-dialog/remind-dialog.component';
import { VoiceAssistantPanelComponent } from './summary/voice-assistant/voice-assistant-panel/voice-assistant-panel.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
    declarations: [
        DashboardComponent,
        SidenavComponent,
        SummaryComponent,
        HistoryComponent,
        HeaderComponent,
        AddTransactionsComponent,
        LastTransactionsComponent,
        LastTransactionsItemComponent,
        SettingsComponent,
        VoiceAssistantComponent,
        TransactionsOfYearComponent,
        MonthTransactionsComponent,
        AlertButtonsComponent,
        RemindDialogComponent,
        VoiceAssistantPanelComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatDialogModule,
        MatMenuModule,
        FormsModule,
        NgxEmojModule,
        NgApexchartsModule,
        TransactionDetailsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatBottomSheetModule,
    ],
})
export class DashboardModule {}
