import { Component, OnInit, Input } from '@angular/core';
import { CreateFileGroupResult } from 'src/app/performance-module/interfaces/StressTesting/CreateFileGroupResult';

/*
  Description: This Component is used to display the information
               about the stress testing create file results.
  ------------------------------------------------------------------
  Creator:     René Deicker
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-create-files-statistics',
  templateUrl: './create-files-statistics.component.html',
  styleUrls: ['./create-files-statistics.component.scss']
})

export class CreateFilesStatisticsComponent implements OnInit {
  @Input() createFileResultGroup: CreateFileGroupResult;

  seriesWriteDuration = [];
  seriesReadDuration = [];
  seriesWriteMBPerSecond = [];
  seriesReadMBPerSecond = [];
  labels = {
    files: 'Files',
    subfolders: 'Subfolders',
    readDuration: 'Read duration',
    writeDuration: 'Write duration',
    writeMBPerSecond: 'Write MB per second',
    readMBPerSecond: 'Read MB per second',
    duration: 'Duration (ms)',
    mbPerSecond: 'MB/second'
  };

  constructor() { }

  ngOnInit() {
    this.createFileResultGroup.groupResult.forEach(groupResult => {
      this.seriesWriteDuration.push({
        name: this.labels.files + ': ' + groupResult.amountOfFiles + ', ' + this.labels.subfolders + ': ' + groupResult.amountOfSubfolders,
        data: [groupResult.writeDuration]
     });
    });

    this.createFileResultGroup.groupResult.forEach(groupResult => {
      this.seriesReadDuration.push({
        name: this.labels.files + ': ' + groupResult.amountOfFiles + ', ' + this.labels.subfolders + ': ' + groupResult.amountOfSubfolders,
        data: [groupResult.readDuration]
     });
    });

    this.createFileResultGroup.groupResult.forEach(groupResult => {
      this.seriesWriteMBPerSecond.push({
        name: this.labels.files + ': ' + groupResult.amountOfFiles + ', ' + this.labels.subfolders + ': ' + groupResult.amountOfSubfolders,
        data: [groupResult.writeMBPerSecond]
     });
    });

    this.createFileResultGroup.groupResult.forEach(groupResult => {
      this.seriesReadMBPerSecond.push({
        name: this.labels.files + ': ' + groupResult.amountOfFiles + ', ' + this.labels.subfolders + ': ' + groupResult.amountOfSubfolders,
        data: [groupResult.readMBPerSecond]
     });
    });
  }
}
