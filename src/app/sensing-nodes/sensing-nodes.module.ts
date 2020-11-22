import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensingNodesRoutingModule } from './sensing-nodes-routing.module';
import { SensingNodesComponent } from './sensing-nodes.component';
import { SensingNodesTableComponent } from './sensing-nodes-table/sensing-nodes-table.component';
import { SensingNodesMapComponent } from './sensing-nodes-map/sensing-nodes-map.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbRouteTabsetModule, NbTabsetModule, NbThemeModule, NbTooltipModule } from '@nebular/theme';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SensingNodesComponent, SensingNodesTableComponent, SensingNodesMapComponent],
  imports: [
    CommonModule,
    SensingNodesRoutingModule,
    LeafletModule,
    NbCardModule,
    NbTabsetModule,
    MatTableModule,
    MatPaginatorModule,
    NbRouteTabsetModule,
    MatMenuModule,
    MatDialogModule,
    NbThemeModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule,
    NbTooltipModule,
    MatProgressSpinnerModule,
  ]
})
export class SensingNodesModule { }
