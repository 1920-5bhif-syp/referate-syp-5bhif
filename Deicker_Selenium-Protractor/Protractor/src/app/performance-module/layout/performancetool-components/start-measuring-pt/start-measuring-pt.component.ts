import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PerformanceToolDataService } from 'src/app/performance-module/services/PerformanceToolDataServices/performancetool.data.service';

/*
  Description: This Component is used to start the performance tool.
  ------------------------------------------------------------------
  Creators:    René Deicker
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-start-measuring-pt',
  templateUrl: './start-measuring-pt.component.html',
  styleUrls: ['./start-measuring-pt.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class StartMeasuringPtComponent {
  measureOptions = [true, true, true, true, true, true];
  measurementStarted: boolean;
  formGroup: FormGroup;

  labels = {
    performanceTool: 'Performance Tool ',
    measurementStarted: 'Measurement started',
    cpu: 'CPU',
    memory: 'Memory',
    disk: 'Disk',
    enmServices: 'EnMPRO-services',
    pagingFile: 'Paging-file',
    networkTraffic: 'Network traffic',
    start: 'Start',
    interval: 'Interval (ms)',
    duration: 'Duration (s)'
  };

  constructor(private performanceToolDataService: PerformanceToolDataService,
              private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group({
      interval: [1000, [Validators.min(100), Validators.required]],
      duration: [5, [Validators.min(1), Validators.required]]
    });
  }

  startMeasurement() {
    if (this.formGroup.controls.interval.value > 100 && this.formGroup.controls.duration.value > 0) {
      this.openSnackBar('Performance Tool has started!', 'Close', 3000);

      this.performanceToolDataService.startMeasuring(this.formGroup.controls.interval.value
        , this.formGroup.controls.duration.value, this.measureOptions)
            .subscribe(() => {
              this.measurementStarted = true;
              this.openSnackBar('Performance Tool is finished!', 'Close', 3000);
            },
            (error) => {
              this.openSnackBar(error.message, 'close', 10000);
            }
      );
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
