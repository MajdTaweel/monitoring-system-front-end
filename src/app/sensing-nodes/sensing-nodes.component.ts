import { SensingNodesService } from './sensing-nodes.service';
import { Component, OnInit } from '@angular/core';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { circle, latLng, marker, polygon, tileLayer } from 'leaflet';

@Component({
  selector: 'app-sensing-nodes',
  templateUrl: './sensing-nodes.component.html',
  styleUrls: ['./sensing-nodes.component.scss']
})
export class SensingNodesComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 22, maxNativeZoom: 19, attribution: '...' })
    ],
    zoom: 18,
    center: latLng(31.891606, 35.212513)
  };

  layers = [
    circle([31.892028, 35.212642], { radius: 1 }),
    circle([31.892009, 35.212620], { radius: 1 }),
    circle([31.891606, 35.212110], { radius: 1 }),
  ];

  constructor(private sensingNodeService: SensingNodesService) { }

  ngOnInit(): void {
    this.sensingNodeService.getSensingNodes().subscribe(sensingNodes => console.log(sensingNodes));
  }

}
