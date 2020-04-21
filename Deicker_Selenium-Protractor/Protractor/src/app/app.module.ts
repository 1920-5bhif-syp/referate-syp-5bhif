import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { PerformanceModule } from './performance-module/performance.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PerformanceModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    HttpClient,
    HttpClientModule,
    HighchartsChartModule,
    MatSnackBar
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]

})
export class AppModule { }
