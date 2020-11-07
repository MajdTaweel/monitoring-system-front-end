import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MagnetometerReadings, MAGNETOMETER_READINGS_ENDPOINT, PollutionReadings, POLLUTION_READINGS_ENDPOINT } from './readings.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  constructor(private http: HttpClient) { }

  getMagnetometerReadings(sensingNodeId: number): Observable<MagnetometerReadings[]> {
    // TODO: Change
    const readings = new MagnetometerReadings();
    readings.id = 1;
    readings.x = 1;
    readings.y = 2;
    readings.z = 3;
    return of([readings]);
    return this.http.get<MagnetometerReadings[]>(MAGNETOMETER_READINGS_ENDPOINT);
  }

  getPollutionReadings(sensingNodeId: number): Observable<PollutionReadings[]> {
    const readings = new PollutionReadings();
    readings.id = 1;
    readings.air = 1;
    readings.sound = 1;
    return of([readings]);
    return this.http.get<PollutionReadings[]>(`${POLLUTION_READINGS_ENDPOINT}`);
  }
}
