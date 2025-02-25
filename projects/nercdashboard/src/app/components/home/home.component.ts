import { Component, OnInit } from '@angular/core';
import { ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
    { category: 'ADMIN', pastDue: 5, dueIn30Days: 3, completed: 10 },
    { category: 'IRO', pastDue: 8, dueIn30Days: 4, completed: 7 },
    { category: 'VAR', pastDue: 6, dueIn30Days: 5, completed: 8 },
    { category: 'TOP', pastDue: 4, dueIn30Days: 6, completed: 12 },
    { category: 'PER', pastDue: 3, dueIn30Days: 7, completed: 9 },
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
}
