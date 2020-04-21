import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupStatistic } from 'src/app/performance-module/interfaces/GroupStatistics';
import { SimplePoint } from 'src/app/performance-module/interfaces/SimpelPoint';
import { Statistic } from 'src/app/performance-module/interfaces/Statistic';
import { PerformanceToolDataService } from 'src/app/performance-module/services/PerformanceToolDataServices/performancetool.data.service';

/*
  Description: This component is used for render and dynamically
               updating the line chart where the measurements are
               drawn.
  ------------------------------------------------------------------
  Creator:     Stefan Leithenmayr
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-measurement-detail-view',
  templateUrl: './measurement-detail-view.component.html',
  styleUrls: ['./measurement-detail-view.component.scss']
})
export class MeasurementDetailViewComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() directory: string;
  @Input() statistic: GroupStatistic;
  @Input() value: number; // 1 for FirstValue, 2 for SecondValue

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  measurements: SimplePoint[];
  actualFileNumber: number;
  amountOfFiles: number;
  updateFlag = true;

  updateFromInput = false;
  chartCallback;
  chart;
  loading = true;
  initialized = false;
  formGroup: FormGroup;

  errorLabels = {
    measurementFetchingError: 'Measurements couldn\'t be loaded',
    toleranceError: 'Tolerance must be greater than zero'
  };

  labels = {
    previous: 'Previous',
    next: 'Next',
    file: 'File: ',
    of: 'of',
    tolerance: 'Tolerance: '
  };

  ngAfterViewInit(): void {
    const self = this;
    self.loadData(0);
  }

  constructor(private performanceToolDataService: PerformanceToolDataService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
                this.formGroup = this.formBuilder.group({
                  tolerance: [1, [Validators.min(0), Validators.required]]
                });
              }

  ngOnInit() {
    this.actualFileNumber = 0;
    this.setOptions();
  }

   ngOnChanges(changes: SimpleChanges): void {
      this.initialized = changes.previousValue !== undefined; // no folder before exists
      if (this.chart !== undefined) {
         this.loadData(0);
      }
   }

   hcCallback(chart: Highcharts.Chart) {
    this.chart = chart;
   }

  setOptions() {
    const currStatistic = this.value === 1 ? this.statistic.firstStatistic : this.statistic.secondStatistic;
    const unit = currStatistic.unit;
    const desc = currStatistic.description;
    const componentName = this.statistic.measuredComponent;
    const maximum = this.getMaximum(currStatistic);

    const self = this;

    this.chartOptions = {
      chart: {
         type: 'spline',
         zoomType: 'x',
         events: {
          load() {
            if (!this.renderer.forExport) {
              self.chart = this;
            }
          }
         }
      },
      title: {
         text: ''
      },
      tooltip: {
      crosshairs: true,
         formatter() {
             return 'DateTime: ' + this.x.toUTCString().replace('GMT', '').slice(0, -1) + ':'
             + this.x.getUTCMilliseconds() + '<br/>' + componentName + ' ' + desc + ': ' + this.y + ' ' + unit;
         }
      },
      xAxis: {
         categories: [],
         crosshair: true,
         tickInterval: 5,
         labels: {
            formatter() {
               if (this.isLast || this.isFirst) {
                  return this.value.toUTCString();
               }
               return this.value.getUTCHours() + ':' + this.value.getMinutes() + ':' +  this.value.getSeconds();
            }
        }
      },
      yAxis :
        {
         min: 0,
         max: maximum,
         title: {
            text: componentName + ' ' + desc + ' (' + unit + ')'
         }
        },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: [{
         name: componentName + ' ' + desc + ' (' + unit + ')',
         data: []
      }]
   };
  }

  loadData(addValue: number) {
  if (this.formGroup.controls.tolerance.value < 0) {
    this.showErrorMessage(this.errorLabels.toleranceError);
    return;
  }
  this.chart.showLoading();
  this.performanceToolDataService
        .getAmountOfFiles(this.directory)
        .subscribe((data) => {
            this.amountOfFiles = data;
            if (addValue !== -2) {
              if (this.actualFileNumber + addValue < 0 || this.actualFileNumber + 1 + addValue > this.amountOfFiles) {
                  this.chart.hideLoading();
                  return;
              }
              this.actualFileNumber += addValue;
              this.performanceToolDataService
                  .getMeasurementsFromFile(this.directory, this.statistic.measuredComponent,
                                          this.value, this.actualFileNumber, this.formGroup.controls.tolerance.value)
                  .subscribe((measurements) => {
                    this.measurements = measurements;
                    this.setMeasurements();
                  },
                  () => {
                    this.showErrorMessage(this.errorLabels.measurementFetchingError);
                  });
            } else {
              this.performanceToolDataService
                  .getAllMeasurements(this.directory, this.statistic.measuredComponent,
                                          this.value, this.formGroup.controls.tolerance.value)
                  .subscribe((measurements) => {
                    this.measurements = measurements;
                    this.setMeasurements();
                  },
                  () => {
                    this.showErrorMessage(this.errorLabels.measurementFetchingError);
                  });
            }
      },
      () => {
        this.showErrorMessage(this.errorLabels.measurementFetchingError);
      });
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

 showErrorMessage(message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  setMeasurements() {
    const currStatistic = this.value === 1 ? this.statistic.firstStatistic : this.statistic.secondStatistic;
    const unit = currStatistic.unit;
    const desc = currStatistic.description;
    const measuredComponent = this.statistic.measuredComponent;

    const values: number[] = [];
    if (this.measurements != null) {
        this.measurements.forEach(point => values.push(point.value));
    }

    const timestamps: Date[] = [];
    if (this.measurements != null) {
        this.measurements.forEach(point => timestamps.push(new Date(point.ts)));
    }

    this.chartOptions.xAxis.categories = timestamps;
    this.chartOptions.series[0].data = values;
    this.chartOptions.series[0].name = this.statistic.measuredComponent +
                                          ' ' + desc + ' (' + unit + ')';
    this.chartOptions.yAxis.max = this.getMaximum(currStatistic);
    this.chartOptions.yAxis.title.text = this.statistic.measuredComponent +
                                          ' ' + desc + ' (' + unit + ')',
    this.chartOptions.tooltip.formatter = function() {
        return 'DateTime: ' + this.x.toUTCString().replace('GMT', '').slice(0, -1)
                            + ':' + this.x.getUTCMilliseconds() + '<br/>' + measuredComponent
                            + ' ' + desc + ': ' + this.y + ' ' + unit;
    };
    this.updateFlag = true;
    this.chart.hideLoading();
  }
}
