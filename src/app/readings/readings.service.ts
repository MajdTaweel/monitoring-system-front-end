import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MagnetometerReadings, MAGNETOMETER_READINGS_ENDPOINT, PollutionReadings, POLLUTION_READINGS_ENDPOINT } from './readings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  constructor(private http: HttpClient) { }

  getMagnetometerReadings(sensingNodeId: number, page: number, size: number): Observable<{ readings: MagnetometerReadings[]; size: number; }> {
    return this.http.get<{ readings: MagnetometerReadings[]; size: number; }>(`${MAGNETOMETER_READINGS_ENDPOINT}/${sensingNodeId}?page=${page}&size=${size}`);
  }

  getPollutionReadings(sensingNodeId: number, page: number, size: number): Observable<{ readings: PollutionReadings[]; size: number; }> {
    return this.http.get<{ readings: PollutionReadings[]; size: number; }>(`${POLLUTION_READINGS_ENDPOINT}/${sensingNodeId}?page=${page}&size=${size}`);
  }
}
