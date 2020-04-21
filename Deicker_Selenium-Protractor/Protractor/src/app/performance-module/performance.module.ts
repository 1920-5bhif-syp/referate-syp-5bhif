import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatIconModule, MatSelectModule, MatSlideToggleModule, MatCardModule, MatButtonToggleModule, MatCheckboxModule, MatTabsModule, MatSnackBarModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatExpansionModule } from '@angular/material';
import { SharedModule as MessageService} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileSizeModule} from 'ngx-filesize';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { PerformanceToolDataComponent } from './layout/performancetool-components/performancetool-data/performancetool-data.component';
import { StatisticComponent } from './layout/performancetool-components/statistic/statistic.component';
import { MeasurementDetailViewComponent } from './layout/performancetool-components/measurement-detail-view/measurement-detail-view.component';
import { HardwareinformationComponent } from './layout/performancetool-components/hardware-information/hardwareinformation.component';
import { StartMeasuringPtComponent } from './layout/performancetool-components/start-measuring-pt/start-measuring-pt.component';
import { StartMeasuringStComponent } from './layout/stresstestingtool-components/start-measuring-st/start-stress-testing.component';
import { StresstestingStatisticsComponent } from './layout/stresstestingtool-components/stresstesting-statistics/stresstesting-statistics.component';
import { StatisticChartComponent } from './layout/stresstestingtool-components/stresstesting-statistics/statistic-chart/statistic-chart.component';
import { CreateFilesStatisticsComponent } from './layout/stresstestingtool-components/stresstesting-statistics/create-files-statistics/create-files-statistics.component';
import { ZipFolderStatisticsComponent } from './layout/stresstestingtool-components/stresstesting-statistics/zip-folder-statistics/zip-folder-statistics.component';
import { LiveDataComponent } from './layout/performancetool-components/live-data/live-data.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,

    // Material imports
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    FileSizeModule,
    MatSlideToggleModule,
    MatIconModule,

    // Primeng import
    TableModule
  ],
  declarations: [
    NavigationComponent,
    PerformanceToolDataComponent,
    StatisticComponent,
    MeasurementDetailViewComponent,
    HardwareinformationComponent,
    StartMeasuringPtComponent,
    StartMeasuringStComponent,
    StresstestingStatisticsComponent,
    StatisticChartComponent,
    CreateFilesStatisticsComponent,
    ZipFolderStatisticsComponent,
    LiveDataComponent
  ],
  providers: [
    MessageService
  ],
  exports: [
    NavigationComponent
  ]
})
export class PerformanceModule { }
