import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Control, divIcon, DomUtil, latLng, Map, Marker, marker, tileLayer } from 'leaflet';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DEFAULT_BOUNDS, DEFAULT_LATITUDE, DEFAULT_LONGITUDE, SensingNode, SensingNodesStats, SensingNodeType, Status } from '../sensing-node.model';
import { SensingNodesService } from '../sensing-nodes.service';

@Component({
  selector: 'app-sensing-nodes-map',
  templateUrl: './sensing-nodes-map.component.html',
  styleUrls: ['./sensing-nodes-map.component.scss']
})
export class SensingNodesMapComponent implements OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

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

  private locationArrowIcon = divIcon({ html: '<i class="fas fa-location-arrow text-primary fa-3x rotate-neg-45"></i>', className: 'location-arrow-marker' });

  private locationMarker = marker([DEFAULT_LATITUDE, DEFAULT_LONGITUDE], { icon: this.locationArrowIcon });

  private heading = 0;

  private infoDiv: HTMLElement;

  private longTouchTimer;

  private sensingNodesSubscription: Subscription;

  private navigateTo: string;

  constructor(
    private sensingNodesService: SensingNodesService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe(queryParamMap => this.navigateTo = queryParamMap.get('navigateTo'));
  }

  ngOnInit(): void {
    this.addLayers();
  }

  onMapReady(map: Map): void {
    this.setViewToCurrentLocation(map).then(_ => this.locationMarker.addTo(map));
    this.watchPosition();
    this.addInfo(map);
    this.addLegend(map);
    if (this.navigateTo?.length) {
      const [latitude, longitude] = this.navigateTo.split(',');
      map.setView([+latitude, +longitude], 18);
    }
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
    this.sensingNodesSubscription = this.sensingNodesService.getSensingNodesEachNumSeconds(30)
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

  private getNodeMarker(sensingNode: SensingNode): { id: number; type: SensingNodeType; marker: Marker; } {
    const icon = sensingNode.status === Status.ONLINE
      ? (
        sensingNode.sensingNodeType === SensingNodeType.MAGNETOMETER
          ? (
            sensingNode.availability
              ? this.availableIcon
              : this.unAvailableIcon
          )
          : this.pollutionIcon
      )
      : this.offlineIcon;
    const nodeMarker = marker([sensingNode.latitude, sensingNode.longitude], { icon });
    nodeMarker.bindPopup(`<b>Node Type: </b>${sensingNode.sensingNodeType}<br/><b>Latitude: </b>${sensingNode.latitude}<br/><b>Longitude: </b>${sensingNode.longitude}<br/><b>Battery: </b>${sensingNode.battery || 0}%<br/>`);
    nodeMarker.addEventListener('contextmenu', this.showContextMenu.bind(this));
    nodeMarker.addEventListener('touchstart', this.onTouchStart.bind(this));
    nodeMarker.addEventListener('touchend', this.onTouchEnd.bind(this))
    return { id: sensingNode.id, type: sensingNode.sensingNodeType, marker: nodeMarker };
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
      this.locationMarker.getElement().style.transform += ` rotate(${(heading || 0)}deg)`;
    }
  }

  private addLegend(map: Map): void {
    const legend = new (Control.extend({ options: { position: 'bottomright' } }));

    legend.onAdd = _ => {

      const div = DomUtil.create('div', 'info legend');

      div.innerHTML += '<h2>Legend</h2>'
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
      this.infoDiv.innerHTML += '<h2>Info</h2>';
      return this.infoDiv;
    };

    info.addTo(map);
  }

  private updateInfo(sensingNodes: SensingNode[]): void {
    const stats = this.extractSensingNodesStats(sensingNodes);
    this.infoDiv.innerHTML = '<h2>Info</h2>';
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

  private showContextMenu(event: any): void {
    this.trigger.menuOpened.asObservable().subscribe(() => {
      const panelId = this.trigger.menu.panelId;
      const panel: HTMLElement = document.querySelector(`#${panelId}`);
      panel.style.position = 'absolute';
      panel.style.left = `${event.containerPoint.x}px`;
      panel.style.top = `${event.containerPoint.y}px`;
    });
    this.trigger.openMenu();
  }

  private onTouchStart(event: any) {
    event.preventDefault();
    if (!this.longTouchTimer) {
      const onLongTouch = () => {
        this.longTouchTimer = null;
        this.showContextMenu(event);
      };
      this.longTouchTimer = setTimeout(onLongTouch, 500);
    }
  }

  private onTouchEnd() {
    if (this.longTouchTimer) {
      clearTimeout(this.longTouchTimer);
      this.longTouchTimer = null;
    }
  }
}
