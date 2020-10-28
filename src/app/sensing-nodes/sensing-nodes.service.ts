import { SensingNode } from './sensing-node.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SENSING_NODES_URL = '/sensing-nodes';

@Injectable({
  providedIn: 'root'
})
export class SensingNodesService {

  constructor(private http: HttpClient) { }

  getSensingNodes(): Observable<SensingNode[]> {
    return this.http.get<SensingNode[]>(environment.sensingNodeServiceApiUrl + SENSING_NODES_URL);
  }
}
