import { SensingNode, SENSING_NODES_ENDPOINT } from './sensing-node.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensingNodesService {

  constructor(private http: HttpClient) { }

  getSensingNodes(): Observable<SensingNode[]> {
    return this.http.get<SensingNode[]>(SENSING_NODES_ENDPOINT);
  }

  getSensingNodesEachNumSeconds(numSeconds: number): Observable<SensingNode[]> {
    return timer(0, numSeconds * 1000).pipe(switchMap(() => this.getSensingNodes()));
  }
}
