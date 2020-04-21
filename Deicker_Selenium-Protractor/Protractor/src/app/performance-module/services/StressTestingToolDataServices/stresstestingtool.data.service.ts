import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StressTestingGroupResult } from '../../interfaces/StressTesting/StressTestingGroupResult';
import { StartStresstestingValue } from '../../interfaces/StressTesting/StartStressTesting/StartStresstestingValue';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StressTestingToolDataService {

  baseUrl = 'http://localhost:4966/api/st/';

  constructor(private httpClient: HttpClient) { }

  //René Deicker
  startMeasuring(startStressTestingValue: StartStresstestingValue): Observable<Date> {
    return this.httpClient.post<Date>(this.baseUrl + 'startTesting',  startStressTestingValue, httpOptions);
  }

  //René Deicker
  getAllFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl + 'getFiles');
  }

  //René Deicker
  getStatistics(fileName: string): Observable<StressTestingGroupResult> {
    const params = new HttpParams().set('fileName', fileName);
    return this.httpClient.get<StressTestingGroupResult>(this.baseUrl + 'getStatistic', { params });
  }
}
