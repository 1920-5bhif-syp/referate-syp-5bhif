import { Component, OnInit, } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import * as Highcharts from 'highcharts';
import { MatSnackBar } from '@angular/material';

/*
  Description: This component is used to get an idea, how
               the live data implementation can look in the future.
  ------------------------------------------------------------------
  Creator:     Stefan Leithenmayr
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit  {

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  actualFileNumber: number;
  amountOfFiles: number;
  updateFlag = true;
  updateFromInput = false;
  chartCallback: any;
  chart: any;
  loading = true;
  initialized = false;

  ngOnInit(): void {
    this.setOptions();
  }

  constructor(public http: HttpClient, private snackBar: MatSnackBar) {
    const self = this;

    this.chartCallback = chart => {
        self.chart = chart;
        this.initialized = true;
        Observable.interval(2000)
        .switchMap(() => this.http.get('http://localhost:4966/api/pt/getActualCpuStatus'))
        .subscribe(data => {
          this.chartOptions.series[0].data.push(data);
          this.updateFlag = true;
        },
        () => {
          this.showErrorMessage('Couldn\'t get the actual CPU status');
        });
     };
  }
  setOptions() {
    this.chartOptions = {
      chart: {
         type: 'spline',
         zoomType: 'x',
         animation: Highcharts.svg
    },
      title: {
         text: ''
      },
      xAxis: {
         categories: [],
         crosshair: true,
         tickInterval: 5,
         tickPixelInterval: 150
        },
      yAxis: {
         min: 0,
         max: 100
        },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [{
         name: 'CPU',
         data: []
      }]
    };
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
