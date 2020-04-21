import { Component, OnInit, Input } from '@angular/core';
import { CreateZipFolderResult } from 'src/app/performance-module/interfaces/StressTesting/CreateZipFolderResult';

/*
  Description: This Component is used to display the zip folder
               creation results.
  ------------------------------------------------------------------
  Creator:     René Deicker
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-zip-folder-statistics',
  templateUrl: './zip-folder-statistics.component.html',
  styleUrls: ['./zip-folder-statistics.component.scss']
})
export class ZipFolderStatisticsComponent implements OnInit {
  @Input() createZipFolderResults: CreateZipFolderResult[];

  seriesZipFolderDuration = [];
  labels = {
    createZipFolderDuration: 'Create Zip-folder duration',
    duration: 'Duration (ms)',
    encoded: 'Encoded',
    folderSize: ' older size'
  };

  constructor() {}

  ngOnInit() {
    this.createZipFolderResults.forEach(zipFolderResult => {
    this.seriesZipFolderDuration.push({
      name: this.labels.encoded + ': ' + zipFolderResult.encoded + ', ' + this.labels.folderSize + ': '
      + zipFolderResult.folderSize + ' Kb', data: [zipFolderResult.duration]});
    });
  }
}
