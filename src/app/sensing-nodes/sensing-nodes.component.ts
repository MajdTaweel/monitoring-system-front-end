import { SensingNodesService } from './sensing-nodes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { circle, latLng, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SensingNode } from './sensing-node.model';

@Component({
  selector: 'app-sensing-nodes',
  templateUrl: './sensing-nodes.component.html',
  styleUrls: ['./sensing-nodes.component.scss']
})
export class SensingNodesComponent implements OnInit, OnDestroy {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 22, maxNativeZoom: 19, attribution: '...' })
    ],
    zoom: 18,
    center: latLng(31.891606, 35.212513)
  };

  layers = [];

  private sensingNodesSubscription: Subscription;


  constructor(private sensingNodesService: SensingNodesService) { }

  ngOnInit(): void {
    this.sensingNodesSubscription = this.sensingNodesService.getSensingNodes()
      .pipe(
        tap(
          (sensingNodes: SensingNode[]) =>
            this.layers = sensingNodes.map(
              (sensingNode: SensingNode) =>
                circle([sensingNode.latitude, sensingNode.longitude], { radius: 1 })
            )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.sensingNodesSubscription) {
      this.sensingNodesSubscription.unsubscribe();
    }
  }
}
