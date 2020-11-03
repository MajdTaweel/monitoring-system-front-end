import { SensingNodesService } from './sensing-nodes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Control, divIcon, DomUtil, latLng, Map, Marker, marker, tileLayer } from 'leaflet';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Availability, SensingNode, Status } from './sensing-node.model';

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
    zoom: 0,
    center: latLng(0, 0)
  };

  layers = [];

  private offlineIcon = divIcon({ className: 'far fa-times-circle text-danger fa-3x' });

  private availableIcon = divIcon({ className: 'fas fa-parking text-success fa-3x' });

  private unAvailableIcon = divIcon({ className: 'fas fa-parking text-danger fa-3x' });

  private locationArrowIcon = divIcon({ className: 'fas fa-location-arrow text-primary fa-3x' });

  private locationMarker = marker([0, 0], { icon: this.locationArrowIcon });

  private heading = 0;

  private sensingNodesSubscription: Subscription;

  constructor(private sensingNodesService: SensingNodesService) { }

  ngOnInit(): void {
    this.addLayers();
  }

  onMapReady(map: Map): void {
    this.setViewToCurrentLocation(map).then(_ => this.locationMarker.addTo(map));
    this.watchPosition();
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
        sensingNode.availability === Availability.AVAILABLE
          ? this.availableIcon
          : this.unAvailableIcon
      )
      : this.offlineIcon;
    return marker([sensingNode.latitude, sensingNode.longitude], { icon })
      .bindPopup(`<b>Latitude: </b>${sensingNode.latitude}<br/><b>Longitude: </b>${sensingNode.longitude}<br/><b>Battery: </b>${sensingNode.battery}%<br/><button>View Readings</button>`);
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
}
