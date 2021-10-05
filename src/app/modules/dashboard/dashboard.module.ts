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
import { SettingsComponent } from './summary/settings/settings.component'
import { MatDialogModule } from '@angular/material/dialog'
import {MatMenuModule} from '@angular/material/menu';
import  {  NgxEmojModule  }  from  'ngx-emoj';
import { VoiceAssistantComponent } from './summary/voice-assistant/voice-assistant.component';

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
    VoiceAssistantComponent
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
    NgxEmojModule
  ]
})
export class DashboardModule { }
