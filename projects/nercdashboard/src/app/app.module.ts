import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [AppComponent, DashboardLayoutComponent],
  imports: [BrowserModule, AppRoutingModule, SidebarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
