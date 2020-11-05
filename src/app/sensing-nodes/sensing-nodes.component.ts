import { SensingNodesService } from './sensing-nodes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Control, divIcon, DomUtil, latLng, Map, Marker, marker, tileLayer } from 'leaflet';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Availability, DEFAULT_BOUNDS, DEFAULT_LATITUDE, DEFAULT_LONGITUDE, SensingNode, SensingNodesStats, SensingNodeType, Status } from './sensing-node.model';

@Component({
  selector: 'app-sensing-nodes',
  templateUrl: './sensing-nodes.component.html',
  styleUrls: ['./sensing-nodes.component.scss']
})
export class SensingNodesComponent implements OnInit, OnDestroy {

  options = {
    layers: [
      tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 22,
          maxNativeZoom: 19,
          // attribution: '...',
          minZoom: 8,
          bounds: DEFAULT_BOUNDS,
        }
      )
    ],
    zoom: 8,
    center: latLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE)
  };

  layers = [];

  private offlineIcon = divIcon({ className: 'far fa-times-circle text-danger fa-3x' });

  private availableIcon = divIcon({ className: 'fas fa-parking text-success fa-3x' });

  private unAvailableIcon = divIcon({ className: 'fas fa-parking text-danger fa-3x' });

  private pollutionIcon = divIcon({ className: 'fas fa-smog text-primary fa-3x' });

  private locationArrowIcon = divIcon({ className: 'fas fa-location-arrow text-primary fa-3x' });

  private locationMarker = marker([DEFAULT_LATITUDE, DEFAULT_LONGITUDE], { icon: this.locationArrowIcon });

  private heading = 0;

  private infoDiv: HTMLElement;

  private sensingNodesSubscription: Subscription;

  constructor(private sensingNodesService: SensingNodesService) { }

  ngOnInit(): void {
    this.addLayers();
  }

  onMapReady(map: Map): void {
    this.setViewToCurrentLocation(map).then(_ => this.locationMarker.addTo(map));
    this.watchPosition();
    this.addInfo(map);
    this.addLegend(map);
  }

  onZoomChange(): void {
    this.updateLocationMarkerHeading(this.heading);
  }

  ngOnDestroy(): void {
    if (this.sensingNodesSubscription) {
      this.sensingNodesSubscription.unsubscribe();
    }
  }

  private addLayers(): void {
    this.sensingNodesSubscription = this.sensingNodesService.getSensingNodes()
      .pipe(
        tap((sensingNodes: SensingNode[]) => {
          this.updateInfo(sensingNodes);
          this.layers = sensingNodes
            // TODO: should be removed as the db must only contain valid lat lng values
            // !REMOVE START
            .filter(
              (sensingNode: SensingNode) => sensingNode.latitude && sensingNode.longitude && sensingNode.latitude >= -90 && sensingNode.latitude <= 90 && sensingNode.longitude >= -180 && sensingNode.longitude <= 180
            )
            // !REMOVE END
            .map((sensingNode: SensingNode) => this.getNodeMarker(sensingNode));
        }),
        catchError((error) => {
          // TODO: handle error ...
          console.log(error);
          return of(error);
        })
      )
      .subscribe();
  }

  private getNodeMarker(sensingNode: SensingNode): Marker {
    const icon = sensingNode.status === Status.ONLINE
      ? (
        sensingNode.sensingNodeType === SensingNodeType.MAGNETOMETER
          ? (
            sensingNode.availability === Availability.AVAILABLE
              ? this.availableIcon
              : this.unAvailableIcon
          )
          : this.pollutionIcon
      )
      : this.offlineIcon;
    return marker([sensingNode.latitude, sensingNode.longitude], { icon })
      .bindPopup(`<b>Node Type: </b>${sensingNode.sensingNodeType}<br/><b>Latitude: </b>${sensingNode.latitude}<br/><b>Longitude: </b>${sensingNode.longitude}<br/><b>Battery: </b>${sensingNode.battery}%<br/><button class="btn btn-info">View Readings</button>`);
  }

  private async setViewToCurrentLocation(map: Map): Promise<void> {
    const location = await this.getLocation();
    this.updateLocationMarkerPosition(
      location.latitude,
      location.longitude,
      location.heading
    );
    map.setView([location.latitude, location.longitude], 18);
  }

  private getLocation(): Promise<{ latitude: number; longitude: number; heading: number; }> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(location =>
        resolve({ latitude: location.coords.latitude, longitude: location.coords.longitude, heading: location.coords.heading }),
        err => reject(err))
    );
  }

  private watchPosition(): void {
    navigator.geolocation.watchPosition(location =>
      this.updateLocationMarkerPosition(
        location.coords.latitude,
        location.coords.longitude,
        location.coords.heading
      )
    );
  }

  private updateLocationMarkerPosition(latitude: number, longitude: number, heading: number): void {
    this.locationMarker.setLatLng([latitude, longitude]);
    this.heading = heading;
    this.updateLocationMarkerHeading(heading);
  }

  private updateLocationMarkerHeading(heading: number): void {
    if (this.locationMarker.getElement()) {
      this.locationMarker.getElement().style.transform += ` rotate(${(heading || 0) - 45}deg)`;
    }
  }

  private addLegend(map: Map): void {
    const legend = new (Control.extend({ options: { position: 'bottomright' } }));

    legend.onAdd = _ => {

      const div = DomUtil.create('div', 'info legend');

      div.innerHTML += '<h6>Legend</h6>'
      div.innerHTML += '<i class="fas fa-location-arrow text-primary"></i>Current Location<br/>';
      div.innerHTML += '<i class="fas fa-parking text-success"></i>Available Parking<br/>';
      div.innerHTML += '<i class="fas fa-parking text-danger"></i>Unavailable Parking<br/>';
      div.innerHTML += '<i class="fas fa-smog text-primary"></i>Air and Noise Pollution Sensor<br/>';
      div.innerHTML += '<i class="far fa-times-circle text-danger"></i>Disconnected';

      return div;
    };

    legend.addTo(map);
  }

  private addInfo(map: Map) {
    const info = new (Control.extend({ options: { position: 'bottomleft' } }));

    info.onAdd = _ => {
      this.infoDiv = DomUtil.create('div', 'info');
      this.infoDiv.innerHTML += '<h6>Info</h6>';
      return this.infoDiv;
    };

    info.addTo(map);
  }

  private updateInfo(sensingNodes: SensingNode[]): void {
    const stats = this.extractSensingNodesStats(sensingNodes);
    this.infoDiv.innerHTML = '<h6>Info</h6>';
    this.infoDiv.innerHTML += `<b>Active Parking Spot Nodes: </b>${stats.magnetometerActiveNum}<br/>`;
    this.infoDiv.innerHTML += `<b>Inactive Parking Spot Nodes: </b>${stats.magnetometerNum - stats.magnetometerActiveNum}<br/>`;
    this.infoDiv.innerHTML += `<b>Active Pollution Nodes: </b>${stats.pollutionActiveNum}<br/>`;
    this.infoDiv.innerHTML += `<b>Inactive Pollution Nodes: </b>${stats.pollutionNum - stats.pollutionActiveNum}<br/>`;
  }

  private extractSensingNodesStats(sensingNodes: SensingNode[]): SensingNodesStats {
    const stats = new SensingNodesStats();
    const magnetometerNodes = sensingNodes.filter(sensingNode => sensingNode.sensingNodeType === SensingNodeType.MAGNETOMETER);
    const pollutionNodes = sensingNodes.filter(sensingNode => sensingNode.sensingNodeType === SensingNodeType.POLLUTION);
    stats.magnetometerNum = magnetometerNodes.length;
    stats.pollutionNum = pollutionNodes.length;
    stats.magnetometerActiveNum = magnetometerNodes.filter(magnetometerNode => magnetometerNode.status === Status.ONLINE).length;
    stats.pollutionActiveNum = pollutionNodes.filter(pollutionNode => pollutionNode.status === Status.ONLINE).length;
    return stats;
  }
}
