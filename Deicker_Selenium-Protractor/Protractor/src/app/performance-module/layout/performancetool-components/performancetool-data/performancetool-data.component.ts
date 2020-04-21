import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { GroupStatistic } from 'src/app/performance-module/interfaces/GroupStatistics';
import { PerformanceToolDataService } from 'src/app/performance-module/services/PerformanceToolDataServices/performancetool.data.service';

/*
  Description: This component is used to draw all measured data.
               (statistics and measurement points)
  ------------------------------------------------------------------
  Creators:    Stefan Leithenmayr
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-performancetool-data',
  templateUrl: './performancetool-data.component.html',
  styleUrls: ['./performancetool-data.component.scss']
})
export class PerformanceToolDataComponent implements OnInit {

  directories: string[];
  statistics: GroupStatistic[];
  currDir: string;
  currTabLabel: string;
  currStatistic: GroupStatistic;

  errorLabels = {
    directoryFetchingError: 'Directories couldn\'t be fetched',
    statisticFetchingError: 'Statistics couldn\'t be fetched'
  };

  constructor(private performanceToolDataService: PerformanceToolDataService,
              private snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.loadDirectories();
  }

  loadDirectories() {
    this.performanceToolDataService
        .getDirectoryList()
        .subscribe((data) => {
          this.directories = data;
          const isInit = this.currDir === undefined;
          this.currDir = this.directories[0];
          if (isInit) {
            this.dirSelectionChanged();
          }
        },
        () => {
          this.showErrorMessage(this.errorLabels.directoryFetchingError);
        });
  }

  dirSelectionChanged() {
    this.performanceToolDataService
        .getStatistics(this.currDir)
        .subscribe((data) => {
          this.statistics = data;
        },
        () => {
            this.showErrorMessage(this.errorLabels.statisticFetchingError);
        });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
