import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HardwareInformation } from 'src/app/performance-module/interfaces/HardwareInformation/HardwareInformation';
import { HardwareInformationDataService } from 'src/app/performance-module/services/PerformanceToolDataServices/hardwareinformation.data.service';

/*
  Description: This Component is used to display the hardware
               information.
  ------------------------------------------------------------------
  Creator:     René Deicker
  ------------------------------------------------------------------
*/

@Component({
  selector: 'app-hardwareinformation',
  templateUrl: './hardwareinformation.component.html',
  styleUrls: ['./hardwareinformation.component.scss']
})
export class HardwareinformationComponent implements OnInit {

  hardwareInformation: HardwareInformation;
  isLoaded: boolean;
  directories: string[];
  selectedDirectory: string = undefined;

  labels = {
    cpu: 'CPU',
    networkCards: 'Network cards',
    memory: 'Memory',
    disk: 'Disk',
    enmPROServices: 'EnMPRO-services',
    installed: 'Installed',
    running: 'Running',
    directories: 'Hardwareinformation directories',
    totalSpace: 'Total space',
    freeSpace: 'Free space',
    architecture: 'Architecture',
    logicalProcessors: 'Logical processors',
    storage: 'Storage'
  };

  constructor(private hardwareinformationDataService: HardwareInformationDataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadDirectories();
  }

  loadDirectories() {
    this.hardwareinformationDataService.getDirectoryList().subscribe((data: string[]) => {
      this.directories = data;
      if (this.selectedDirectory === undefined && this.directories.length > 0) {
        this.selectedDirectory = this.directories[0];
        this.dirSelectionChanged();
      }
    });
  }

  dirSelectionChanged() {
    this.hardwareinformationDataService.getHardwareInformation(this.selectedDirectory)
    .subscribe((data) => {
        this.hardwareInformation = data;
        this.isLoaded = true;
      },
      () => {
        this.showErrorMessage();
      }
    );
  }

  showErrorMessage() {
    this.snackBar.open('Couldn\'t load hardware informations', 'Error', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
