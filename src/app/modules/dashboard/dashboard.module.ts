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

@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    SummaryComponent,
    HistoryComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
