import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GroupStatistic } from 'src/app/performance-module/interfaces/GroupStatistics';
import { Statistic } from 'src/app/performance-module/interfaces/Statistic';

/*
  Description: This Component is used to display the statistics and
               to call the measurement-detail-view component.
  ------------------------------------------------------------------
  Creator:     Stefan Leithenmayr
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  @Input() statistic: GroupStatistic;
  @Input() directory: string;

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  areTwoStatistics: boolean;
  firstStatShown: boolean;
  showDetails: boolean;
  value: number;
  actualStatistic: Statistic[];

  constructor() {  }

  ngOnInit() {
    if (this.statistic.secondStatistic !== null) {
      this.areTwoStatistics = true;
    } else {
      this.areTwoStatistics = false;
    }
    this.setOptions(this.statistic.firstStatistic);
    this.firstStatShown = true;
    this.value = 1;
  }

  setOptions(statistic: Statistic) {
    const maximum = this.getMaximum(statistic);
    this.actualStatistic = [];
    this.actualStatistic.push(statistic);

    this.chartOptions = {
      chart: {
         type: 'column'
      },
      title: {
         text: ''
      },
      xAxis: {
         categories: ['Minimum', 'Maximum', 'Average']
      },
      yAxis :
        {
         min: 0,
         max: maximum,
         title: {
            text: this.statistic.measuredComponent + ' ' + statistic.description +
            ' (' + statistic.unit + ')'
         }
        },
      series: [{
         name: this.statistic.measuredComponent + ' Statistic',
         data: [statistic.minimum, statistic.maximum, statistic.average]}]
   };
  }

  getMaximum(statistic: Statistic) {
    if (statistic.unit === '%') {
      return 100;
    }
    if (statistic.maximum > statistic.maximum) {
      return this.statistic.firstStatistic.maximum;
    }
    return statistic.maximum;
  }

  showOtherStats() {
    if (this.firstStatShown) {
      this.firstStatShown = false;
      this.value = 2;
      this.setOptions(this.statistic.secondStatistic);
    } else {
      this.firstStatShown = true;
      this.value = 1;
      this.setOptions(this.statistic.firstStatistic);
    }
    this.showDetails = false;
  }

  toogleDetails() {
    if (this.showDetails) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
  }
}
