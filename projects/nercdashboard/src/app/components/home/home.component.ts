import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('toast') toast!: ToastComponent;
  standardFamilyList: any = [
    {
      id: 1,
      field: 'Data1',
    },
    {
      id: 2,
      field: 'Data2',
    },
  ];
  standardFamilyMappedProperty = { text: 'field', value: 'id' };
  selectedStandardFamilyData: any = {};
  public chartTitle: string = 'Task Status';

  // Task data
  public chartData: Object[] = [
    { category: 'MOD', pastDue: 2, dueIn30Days: 12, completed: 15 },
    { category: 'PRC', pastDue: 1, dueIn30Days: 3, completed: 8 },
    { category: 'CIP', pastDue: 4, dueIn30Days: 0, completed: 12 },
    { category: 'BAL', pastDue: 1, dueIn30Days: 8, completed: 9 },
    { category: 'COM', pastDue: 2, dueIn30Days: 10, completed: 17 },
    { category: 'TOP', pastDue: 3, dueIn30Days: 5, completed: 8 },
    { category: 'VAR', pastDue: 5, dueIn30Days: 8, completed: 15 },
    { category: 'IRO', pastDue: 2, dueIn30Days: 7, completed: 16 },
    { category: 'ADMIN', pastDue: 2, dueIn30Days: 10, completed: 15 },
    { category: 'SEC', pastDue: 6, dueIn30Days: 4, completed: 10 },
    { category: 'COM', pastDue: 3, dueIn30Days: 9, completed: 12 },
    { category: 'FIN', pastDue: 4, dueIn30Days: 11, completed: 14 },
    { category: 'HR', pastDue: 2, dueIn30Days: 6, completed: 13 },
    { category: 'OPS', pastDue: 5, dueIn30Days: 7, completed: 17 },
    { category: 'LOG', pastDue: 1, dueIn30Days: 3, completed: 8 },
    { category: 'IT', pastDue: 3, dueIn30Days: 9, completed: 11 },
    { category: 'ENG', pastDue: 4, dueIn30Days: 2, completed: 10 },
    { category: 'QA', pastDue: 2, dueIn30Days: 5, completed: 12 },
    // { category: 'DEV', pastDue: 6, dueIn30Days: 8, completed: 16 },
    // { category: 'TEST', pastDue: 3, dueIn30Days: 4, completed: 11 },
    // { category: 'SUP', pastDue: 4, dueIn30Days: 6, completed: 13 },
    // { category: 'MKT', pastDue: 2, dueIn30Days: 7, completed: 12 },
    // { category: 'RISK', pastDue: 5, dueIn30Days: 3, completed: 9 },
    // { category: 'POL', pastDue: 3, dueIn30Days: 8, completed: 10 },
    // { category: 'AUD', pastDue: 1, dueIn30Days: 2, completed: 8 },
    // { category: 'PROC', pastDue: 6, dueIn30Days: 5, completed: 11 },
    // { category: 'STR', pastDue: 3, dueIn30Days: 6, completed: 14 },
    // { category: 'SAFE', pastDue: 4, dueIn30Days: 7, completed: 13 },
    // { category: 'TRN', pastDue: 2, dueIn30Days: 5, completed: 10 },
    // { category: 'WHS', pastDue: 5, dueIn30Days: 4, completed: 12 },
    // { category: 'PLN', pastDue: 3, dueIn30Days: 9, completed: 11 },
    // { category: 'EVN', pastDue: 6, dueIn30Days: 3, completed: 9 },
    // { category: 'CRM', pastDue: 2, dueIn30Days: 7, completed: 12 },
    // { category: 'DOC', pastDue: 4, dueIn30Days: 5, completed: 13 },
    // { category: 'FAC', pastDue: 3, dueIn30Days: 6, completed: 10 },
    // { category: 'CON', pastDue: 5, dueIn30Days: 8, completed: 15 },
    // { category: 'SRV', pastDue: 1, dueIn30Days: 4, completed: 8 },
    // { category: 'PJT', pastDue: 4, dueIn30Days: 7, completed: 11 },
    // { category: 'RES', pastDue: 2, dueIn30Days: 6, completed: 12 },
    // { category: 'SVC', pastDue: 5, dueIn30Days: 3, completed: 10 },
    // { category: 'QMS', pastDue: 3, dueIn30Days: 9, completed: 14 },
    // { category: 'CMR', pastDue: 6, dueIn30Days: 5, completed: 13 },
    // { category: 'DAT', pastDue: 2, dueIn30Days: 4, completed: 11 },
    // { category: 'RPT', pastDue: 4, dueIn30Days: 8, completed: 12 },
    // { category: 'CMP', pastDue: 3, dueIn30Days: 5, completed: 9 },
    // { category: 'TCH', pastDue: 5, dueIn30Days: 7, completed: 15 },
    // { category: 'DBS', pastDue: 2, dueIn30Days: 6, completed: 10 },
    // { category: 'HLP', pastDue: 4, dueIn30Days: 3, completed: 11 },
  ];

  public primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Task Categories',
  };

  public primaryYAxis: Object = {
    title: 'Number of Tasks',
  };

  public tooltip: Object = {
    enable: true,
  };
  public complianceCountDetails: any = {
    pastDue: 0,
    completed: 0,
    thirtyDue: 0,
  };
  public staticWidgetDetails = [
    {
      label: 'Registered as',
      value: 'GO, GOP',
    },
    {
      label: 'RE',
      value: 'ReliabilityFirst (RF)',
    },
    {
      label: 'Asset Manager',
      value: 'Corey Lyons-LSP',
    },
    {
      label: 'CIP Senior Manager Delegates',
      value: 'Tyler Legg-PIC',
    },
    {
      label: 'O&P Approval',
      value: 'Tyler Legg-PIC',
    },
    {
      label: 'BES Cyber Systems',
      value: 'Low impact/PIC ROC',
    },
  ];
  public cellSpacing: number[] = [10, 10];
  public mediaQuery: string = 'max-height: 100%';

  ngOnInit(): void {
    this.complianceCountDetails.pastDue = this.chartData.reduce(
      (sum, item: any) => sum + item.pastDue,
      0
    );
    this.complianceCountDetails.completed = this.chartData.reduce(
      (sum, item: any) => sum + item.completed,
      0
    );
    this.complianceCountDetails.thirtyDue = this.chartData.reduce(
      (sum, item: any) => sum + item.dueIn30Days,
      0
    );
  }

  dropdownChanges(event: any) {}
  getWidgetDetails(count: any, type: any) {
    this.toast.cssClass = '';
    switch (type) {
      case 'pastDue':
        this.toast.title = 'Past Due';
        this.toast.cssClass = 'toater-past-due';
        break;
      case 'completed':
        this.toast.title = 'Completed';
        this.toast.cssClass = 'toater-completed';
        break;
      case 'thirtyDue':
        this.toast.title = 'Due in 30 days';
        this.toast.cssClass = 'toater-30days';
        break;
    }
    this.toast.content = count.toString() || '0';
    this.toast.show();
  }

  chartLoaded(args: ILoadedEventArgs) {
    // args.chart.refresh();
  }
}
