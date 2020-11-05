import { SensingNode, SENSING_NODES_ENDPOINT } from './sensing-node.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensingNodesService {

  constructor(private http: HttpClient) { }

  getSensingNodes(): Observable<SensingNode[]> {
    return this.http.get<SensingNode[]>(SENSING_NODES_ENDPOINT);
  }
}
