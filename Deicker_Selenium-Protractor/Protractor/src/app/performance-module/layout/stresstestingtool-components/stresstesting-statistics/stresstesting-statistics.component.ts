import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { StressTestingGroupResult } from 'src/app/performance-module/interfaces/StressTesting/StressTestingGroupResult';
import { StressTestingToolDataService } from 'src/app/performance-module/services/StressTestingToolDataServices/stresstestingtool.data.service';

/*
  Description: This component is used to display the information
               about the stress testing results.
  ------------------------------------------------------------------
  Creator:     René Deicker
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-stresstesting-statistics',
  templateUrl: './stresstesting-statistics.component.html',
  styleUrls: ['./stresstesting-statistics.component.scss']
})
export class StresstestingStatisticsComponent implements OnInit {
  files: string[];
  selectedFile: string = undefined;
  stressTestingGroupResult: StressTestingGroupResult;
  dataLoaded: boolean;
  labels = {
    files: 'Files',
    zipFolderResults: 'Zip-Folder results'
  };

  constructor(private stressTestingToolDataService: StressTestingToolDataService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadFiles();
  }

  fileSelectionChanged() {
    this.dataLoaded = false;
    this.stressTestingToolDataService.getStatistics(this.selectedFile)
    .subscribe((data: StressTestingGroupResult) => {
      this.stressTestingGroupResult = data;
      this.dataLoaded = true;
    });
  }

  loadFiles() {
    this.stressTestingToolDataService.getAllFiles()
    .subscribe((data) => {
        this.files = data;
        if (this.selectedFile === undefined) {
          this.selectedFile = this.files[0];
          this.fileSelectionChanged();
        }
      },
      () => {
        this.showErrorMessage();
      }
    );
  }

  showErrorMessage() {
    this.snackBar.open('Couldn\'t load all files', 'Error', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
