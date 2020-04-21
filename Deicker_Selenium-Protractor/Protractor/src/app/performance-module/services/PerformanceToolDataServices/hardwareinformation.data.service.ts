import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HardwareInformation } from '../../interfaces/HardwareInformation/HardwareInformation';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HardwareInformationDataService {
  baseUrl = 'http://localhost:4966/api/hwi/';

  constructor(private httpClient: HttpClient) { }

  //René Deicker
  getHardwareInformation(selectedDir: string): Observable<HardwareInformation> {
    const params = new HttpParams().set('folderName', selectedDir);
    return this.httpClient.get<HardwareInformation>(this.baseUrl + 'getInformation', { params });
  }

  //René Deicker
  getDirectoryList(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseUrl + 'getDirectories', httpOptions);
  }
}
