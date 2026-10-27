import { Component, OnInit, ViewChild } from '@angular/core';
import { MainMenuService } from '../../views/layout/services/main-menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import * as objectPath from 'object-path';
import { MenuConfig } from '../../core/config/menu.config'
import { BundleService, ThreadService } from 'src/app/core/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
const systemConfig = require("../../core/config/systemConfig.json");
import { forkJoin } from 'rxjs';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public menuItems: any;
  public landingMenus: any[] = [];
  isMultipleTiles: boolean = true;
  constructor(
    public mainMenuService: MainMenuService,
    private router: Router,
    private authService: AuthService,
    private bundleService: BundleService,
    private threadService: ThreadService
  ) {
    var box_key = localStorage.getItem('box_key');
    if(box_key && box_key != '') {
      localStorage.removeItem('box_key');
    }
    this.menuItems = objectPath.get(new MenuConfig().defaults, 'menu');
    for (const key in this.menuItems) {
      this.landingMenus.push(this.menuItems[key]);
    }

    
   }

  
  totalParticipants = 0;
  totalSenior=0;
  totalSenior_m=0;
  totalSenior_f=0;

  totalJunior=0;
  totalJunior_m=0;
  totalJunior_f=0;

  totalCadet=0;
  totalCadet_m=0;
  totalCadet_f=0;

  totalSubJunior=0;
  totalSubJunior_m=0;
  totalSubJunior_f=0;

  totalPeewee=0;
  totalPeewee_m=0;
  totalPeewee_f=0;

  stats: any;

  ngOnInit() {
    this.blockUI.start("Loading...");
    if(systemConfig.boxConfig.boxType == "single") 
      this.isMultipleTiles = false;

    let bundleId = 1001;
    let participantBundleDetails = this.bundleService.getBundle(bundleId)
    let templateName = participantBundleDetails[0].defaultTemplate.name;;
    var query = participantBundleDetails[0]['inboxUIConfig']['defaultQuery'];
    // var filterConfig = {};
    // this.threadService.countThreads(bundleId, templateName, filterConfig).subscribe(result => {
    //   if (result['status'] == 1) {
    //     this.totalParticipants = parseInt(result['threads']);
    //     this.blockUI.stop();
    //   }
    // })

    // var seniorfilterConfig = {'categoryName': "Senior"};
    // this.threadService.countThreads(bundleId, templateName, seniorfilterConfig).subscribe(result => {
    //   if (result['status'] == 1) {
    //     console.log("result", result)
    //     this.totalSenior = parseInt(result['threads']);
    //   }
    // })

    

    // var juniorfilterConfig = {'categoryName': "Junior"};
    // this.threadService.countThreads(bundleId, templateName, juniorfilterConfig).subscribe(result => {
    //   if (result['status'] == 1) {
    //     console.log("result", result)
    //     this.totalJunior = parseInt(result['threads']);
    //   }
    // })

    

    // var cadetfilterConfig = {'categoryName': "Cadet"};
    // this.threadService.countThreads(bundleId, templateName, cadetfilterConfig).subscribe(result => {
    //   if (result['status'] == 1) {
    //     console.log("result", result)
    //     this.totalCadet = parseInt(result['threads']);
    //     //this.blockUI.stop();
    //   }
    // })

    

    // var subJuniorfilterConfig = {'categoryName': "Sub junior"};
    // this.threadService.countThreads(bundleId, templateName, subJuniorfilterConfig).subscribe(result => {
    //   if (result['status'] == 1) {
    //     console.log("result", result)
    //     this.totalSubJunior = parseInt(result['threads']);
    //     //this.blockUI.stop();
    //   }
    // })

    

    // var peeweefilterConfig = {'categoryName': "Peewee"};
    // this.threadService.countThreads(bundleId, templateName, peeweefilterConfig).subscribe(result => {
    //   if (result['status'] == 1) {
    //     console.log("result", result)
    //     this.totalPeewee = parseInt(result['threads']);
    //     //this.blockUI.stop();
    //   }
    // })


    

    

    // all API observables
    const apiCalls = [
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Senior", gender: "Male" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Senior", gender: "Female" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Junior", gender: "Male" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Junior", gender: "Female" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Cadet", gender: "Male" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Cadet", gender: "Female" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Sub junior", gender: "Male" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Sub junior", gender: "Female" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Peewee", gender: "Male" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Peewee", gender: "Female" }),

      this.threadService.countThreads(bundleId, templateName, {}),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Senior" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Junior" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Cadet" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Sub junior" }),
      this.threadService.countThreads(bundleId, templateName, { categoryName: "Peewee" }),
    ];

    forkJoin(apiCalls).subscribe({
      next: (results: any) => {
        // results[] array order matches apiCalls[] order
        this.totalSenior_m = parseInt(results[0].threads || 0);
        this.totalSenior_f = parseInt(results[1].threads || 0);
        this.totalJunior_m = parseInt(results[2].threads || 0);
        this.totalJunior_f = parseInt(results[3].threads || 0);
        this.totalCadet_m = parseInt(results[4].threads || 0);
        this.totalCadet_f = parseInt(results[5].threads || 0);
        this.totalSubJunior_m = parseInt(results[6].threads || 0);
        this.totalSubJunior_f = parseInt(results[7].threads || 0);
        this.totalPeewee_m = parseInt(results[8].threads || 0);
        this.totalPeewee_f = parseInt(results[9].threads || 0);

        this.totalParticipants = parseInt(results[10].threads || 0);
        this.totalSenior = parseInt(results[11].threads || 0);
        this.totalJunior = parseInt(results[12].threads || 0);
        this.totalCadet = parseInt(results[13].threads || 0);
        this.totalSubJunior = parseInt(results[14].threads || 0);
        this.totalPeewee = parseInt(results[15].threads || 0);


        this.stats = [
          { label: 'Total Participants', value: this.totalParticipants },
          { label: 'Total Senior', value: this.totalSenior },
          { label: 'Total Junior', value: this.totalJunior },
          { label: 'Total Cadet', value: this.totalCadet },
          { label: 'Total Sub Junior', value: this.totalSubJunior },
          { label: 'Total Peewee', value: this.totalPeewee },
        ];

        // now safely load the chart
        this.loadChart();
        this.blockUI.stop();
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.blockUI.stop();
      }
    });
  }

  loadChart() {
    this.chartOptions = {
      series: [
        {
          name: "Male",
          data: [this.totalSenior_m, this.totalJunior_m, this.totalCadet_m, this.totalSubJunior_m, this.totalPeewee_m]
        },
        {
          name: "Female",
          data: [this.totalSenior_f, this.totalJunior_f, this.totalCadet_f, this.totalSubJunior_f, this.totalPeewee_f]
        }
      ],
      chart: {
        type: "bar",
        height: 370
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Senior",
          "Junior",
          "Cadet",
          "Sub Junior",
          "Peewee"
        ]
      },
      yaxis: {
        title: {
          text: ""
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return  val + "";
          }
        }
      }
    };
  }

  loadModule(pageUrl, boxId) {
    localStorage.setItem('box_key', boxId);
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
    this.router.navigate([pageUrl]);
  }
}
