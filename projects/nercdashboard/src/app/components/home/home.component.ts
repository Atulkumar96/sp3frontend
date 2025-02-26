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
    { category: 'EOP', pastDue: 1, dueIn30Days: 8, completed: 9 },
    { category: 'PER', pastDue: 2, dueIn30Days: 10, completed: 17 },
    { category: 'TOP', pastDue: 3, dueIn30Days: 5, completed: 8 },
    { category: 'VAR', pastDue: 5, dueIn30Days: 8, completed: 15 },
    { category: 'IRO', pastDue: 2, dueIn30Days: 7, completed: 16 },
    { category: 'ADMIN', pastDue: 2, dueIn30Days: 10, completed: 15 },
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
    this.toast.content = count;
    switch (type) {
      case 'pastDue':
        this.toast.title = 'Past Due';
        break;
      case 'completed':
        this.toast.title = 'Completed';
        break;
      case 'thirtyDue':
        this.toast.title = 'Due in 30 days';
        break;
    }
    this.toast.cssClass = 'e-toast-success';
    this.toast.show();
  }
}
