import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensingNodesRoutingModule } from './sensing-nodes-routing.module';
import { SensingNodesComponent } from './sensing-nodes.component';


@NgModule({
  declarations: [SensingNodesComponent],
  imports: [
    CommonModule,
    SensingNodesRoutingModule,
    LeafletModule,
  ]
})
export class SensingNodesModule { }
