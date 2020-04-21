import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MeasurementValueGroup } from 'src/app/performance-module/interfaces/StressTesting/StartStressTesting/MeasurementValueGroup';
import { StressTestingToolDataService } from 'src/app/performance-module/services/StressTestingToolDataServices/stresstestingtool.data.service';
import { MeasurementValue } from 'src/app/performance-module/interfaces/StressTesting/StartStressTesting/MeasurementValue';

/*
  Description: This Component is used to start the stress
               testing tool.
  ------------------------------------------------------------------
  Creator:     René Deicker
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-start-measuring-st',
  templateUrl: './start-stress-testing.component.html',
  styleUrls: ['./start-stress-testing.component.scss']
})
export class StartMeasuringStComponent {
  @ViewChild('tabGroup', { static: false }) tabGroup;

  measurementStarted: boolean;
  measurementValueGroups: MeasurementValueGroup[];
  selectedSizeType: string;
  labels = {
    stressTestingTool: 'Stresstesting Tool',
    totalFileSize: 'Total file size (Kb)',
    addGroup: 'Add group',
    measurementGroup: 'Measurement group',
    fileSize: 'File size',
    start: 'Start',
    amountOfFiles: 'Amount of files',
    amountOfSubfolders: 'Amount of subfolders',
    delete: 'Delete',
    add: 'Add',
    deleteGroup: 'Delete group',
    amountOfMeasurements: 'Measurements',
    zipFolderSize: 'Zip folder size',
    sizeType: 'Size type'
  };
  formGroup: FormGroup;
  sizeTypes: string[] = ['Kb' , 'Mb', 'Gb'];

  constructor(private stressTestingToolDataService: StressTestingToolDataService,
              private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.measurementValueGroups = [
      {
        totalFileSize: 500,
        measurementValues: [
          { amountOfFiles: 7, amountOfSubfolders: 5 },
          { amountOfFiles: 1, amountOfSubfolders: 0 },
          { amountOfFiles: 10, amountOfSubfolders: 5 }
        ]
      },
      {
        totalFileSize: 5120,
        measurementValues: [
          { amountOfFiles: 10, amountOfSubfolders: 0 },
          { amountOfFiles: 1, amountOfSubfolders: 0 },
          { amountOfFiles: 10, amountOfSubfolders: 5 },
          { amountOfFiles: 5, amountOfSubfolders: 5 }
        ]
      }
    ];

    this.formGroup = this.formBuilder.group({
      amountOfSubfolders: [undefined, [Validators.min(0), Validators.required]],
      amountOfFiles: [undefined, [Validators.min(1), Validators.required]],
      totalFileSize: [undefined, [Validators.min(1), Validators.required]],
      amountOfMeasurements: [5, [Validators.min(1), Validators.required]],
      zipFolderSize: [5000, [Validators.min(1), Validators.required]],
      sizeTypeFile: ['Kb', [Validators.required]],
      sizeTypeZipFolder: ['Kb', [Validators.required]]
    });
  }

  startMeasurement() {
    let startMeasurements: boolean;
    for (const measurementValueGroup of this.measurementValueGroups) {
      if (measurementValueGroup.measurementValues.length === 0) {
        const index = this.measurementValueGroups.indexOf(measurementValueGroup, 0);
        if (index > -1) {
          this.measurementValueGroups.splice(index, 1);
        }
      } else {
        startMeasurements = true;
      }
    }

    if (startMeasurements && this.formGroup.controls.amountOfMeasurements.value > 0) {
      this.showMessage('Stress testing tool has started!', 'Close');
      this.stressTestingToolDataService.startMeasuring(
            {amountOfMeasurements: this.formGroup.controls.amountOfMeasurements.value,
            measurementValueGroups: this.measurementValueGroups,
            zipFolderSize: this.formGroup.controls.zipFolderSize.value * this.getMultiplicatorZipFolderSize()})
            .subscribe(() => {
              this.measurementStarted = true;
              this.showMessage('Stress testing tool is finished!', 'Close');
            },
            () => {
              this.showMessage('Couldn\'t start stress tests', 'Error');
            }
      );
    }
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  addMeasurementValueGroup() {
    if (this.formGroup.controls.totalFileSize.value > 0 && !this.doesMeasurementValueGroupExist()) {
      this.measurementValueGroups.push({
        totalFileSize: this.formGroup.controls.totalFileSize.value * this.getMultiplicatorFileSize(),
        measurementValues: []
      });
      this.formGroup.controls.totalFileSize.setValue('');
    }
  }
  getMultiplicatorZipFolderSize() {
    if (this.formGroup.controls.sizeTypeZipFolder.value === 'Kb') {
      return 1;
    } else if (this.formGroup.controls.sizeTypeZipFolder.value === 'Mb') {
      return 1024;
    }
    return 1024 * 1024;
  }

  getMultiplicatorFileSize() {
    if (this.formGroup.controls.sizeTypeFile.value === 'Kb') {
      return 1;
    } else if (this.formGroup.controls.sizeTypeFile.value === 'Mb') {
      return 1024;
    }
    return 1024 * 1024;
  }

  doesMeasurementValueGroupExist(): boolean {
    for (const measurementValueGroup of this.measurementValueGroups) {
      if (measurementValueGroup.totalFileSize === this.formGroup.controls.totalFileSize.value * this.getMultiplicatorFileSize()) {
        return true;
      }
    }
    return false;
  }

  deleteMeasurementValue(measurementValueGroup: MeasurementValueGroup, measurementValue: MeasurementValue) {
    measurementValueGroup.measurementValues.splice(measurementValueGroup.measurementValues.indexOf(measurementValue), 1);

    if (measurementValueGroup.measurementValues.length === 0) {
      this.measurementValueGroups.splice(this.measurementValueGroups.indexOf(measurementValueGroup), 1);
    }
  }

  addMeasurementValue(measurementValueGroup: MeasurementValueGroup) {
    if (this.formGroup.controls.amountOfSubfolders.value != null && this.formGroup.controls.amountOfFiles.value != null &&
        this.formGroup.controls.amountOfFiles.value > 0 &&
        this.formGroup.controls.amountOfFiles >= this.formGroup.controls.amountOfSubfolders &&
        this.formGroup.controls.amountOfSubfolders.value >= 0 && !this.doesMeasurementValueExist(measurementValueGroup)) {

        measurementValueGroup.measurementValues.push({
          amountOfFiles: this.formGroup.controls.amountOfFiles.value,
          amountOfSubfolders: this.formGroup.controls.amountOfSubfolders.value
        });
        this.formGroup.controls.amountOfFiles.setValue('');
        this.formGroup.controls.amountOfSubfolders.setValue('');
    }
  }

  doesMeasurementValueExist(measurementValueGroup: MeasurementValueGroup): boolean {
    for (const measurementValue of measurementValueGroup.measurementValues) {
      if (measurementValue.amountOfFiles === this.formGroup.controls.amountOfFiles.value &&
        measurementValue.amountOfSubfolders === this.formGroup.controls.amountOfSubfolders.value) {
        return true;
      }
    }
    return false;
  }

  deleteMeasurementValueGroup(measurementValueGroup) {
    this.measurementValueGroups.splice(this.measurementValueGroups.indexOf(measurementValueGroup), 1);
  }
}
