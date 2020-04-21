import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

/*
  Description: This component is used to display the data in a
               highcharts diagram.
  ------------------------------------------------------------------
  Creator:     René Deicker
  ------------------------------------------------------------------
*/

@Component({
   selector: 'app-statistic-chart',
   templateUrl: './statistic-chart.component.html',
   styleUrls: ['./statistic-chart.component.scss']
})
export class StatisticChartComponent implements OnInit {
   @Input() categories: any;
   @Input() series: any;
   @Input() titleText: string;

   highcharts = Highcharts;
   chartOptions: Highcharts.Options;

   constructor() { }

   ngOnInit() {
    let maximum = 0;
    for (const serie of this.series) {
        if (+serie.data > maximum) {
          maximum = serie.data;
        }
    }

    this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: this.categories,
          crosshair: true
        },
        yAxis:
        {
          min: 0,
          max: maximum,
          title: {
              text: this.titleText
          }
        },
        plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
        },
        series: this.series
      };
   }
}
