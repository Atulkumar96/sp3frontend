import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent {
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  currentPage = 'Home';
  sideBarItems: any = [
    {
      itemName: 'Home',
      icon: 'e-home',
    },
    {
      itemName: 'Work',
      icon: 'e-work-week',
    },
    {
      itemName: 'Reports',
      icon: 'e-chart-2d-stacked-line-marked',
    },
  ];

  toggleSidebar() {
    this.sidebar.toggle();
  }
  navigate(page: string) {
    this.currentPage = page;
    // this.sidebar.hide();
  }
  onCreated(event: any) {
    this.sidebar.show();
    this.sidebar.isOpen;
  }
}
