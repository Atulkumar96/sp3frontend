import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ChartAllModule, ChartModule } from '@syncfusion/ej2-angular-charts';
import { ReliabilityScoreComponent } from './components/reliability-score/reliability-score.component';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    HomeComponent,
    ReliabilityScoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    DropDownListModule,
    DashboardLayoutModule,
    ChartModule,
    ChartAllModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
