import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupStatistic } from '../../interfaces/GroupStatistics';
import { SimplePoint } from '../../interfaces/SimpelPoint';
import { StartPerformanceToolValue } from '../../interfaces/StartPerformanceToolValue';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerformanceToolDataService {

  baseUrl = 'http://localhost:4966/api/pt/';

  constructor(private httpClient: HttpClient) { }

  //Stefan Leithenmayr
  getAllMeasurements(folderName: string, componentType: string, value: number, tolerance: number): Observable<SimplePoint[]> {
    const params = new HttpParams().set('folderName', folderName)
                                   .set('componentType', componentType)
                                   .set('value', value.toString())
                                   .set('tolerance', tolerance.toString());
    return this.httpClient.get<SimplePoint[]>(this.baseUrl + 'getAllMeasurements', { params });
  }

  //Stefan Leithenmayr
  getMeasurementsFromFile(folderName: string, componentType: string, value: number, fileNumber: number,
                          tolerance: number): Observable<SimplePoint[]> {
    const params = new HttpParams().set('folderName', folderName)
                                   .set('componentType', componentType)
                                   .set('value', value.toString())
                                   .set('fileNumber', fileNumber.toString())
                                   .set('tolerance', tolerance.toString());
    return this.httpClient.get<SimplePoint[]>(this.baseUrl + 'getFileMeasurements', { params });
  }

  //Stefan Leithenmayr
  getAmountOfFiles(folderName: string){
    const params = new HttpParams().set('folderName', folderName);
    return this.httpClient.get<number>(this.baseUrl + 'getAmountOfFiles', {params});
  }

  //Stefan Leithenmayr
  getDirectoryList(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl + 'getDirectories');
  }

  //Stefan Leithenmayr
  getStatistics(folderName: string): Observable<GroupStatistic[]> {
    const params = new HttpParams().set('folderName', folderName);
    return this.httpClient.get<GroupStatistic[]>(this.baseUrl + 'getAllStatistics', { params });
  }

  //René Deicker
  startMeasuring(interval: number, duration: number, measurementOptions: boolean[]): Observable<Date>{
    const values: StartPerformanceToolValue = {interval, duration, measurementOptions};
    return this.httpClient.post<Date>(this.baseUrl + 'startMeasuring',  values, httpOptions);
  }
}
