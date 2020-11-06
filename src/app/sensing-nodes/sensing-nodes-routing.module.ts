import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensingNodesMapComponent } from './sensing-nodes-map/sensing-nodes-map.component';
import { SensingNodesTableComponent } from './sensing-nodes-table/sensing-nodes-table.component';

import { SensingNodesComponent } from './sensing-nodes.component';

const routes: Routes = [
  {
    path: '',
    component: SensingNodesComponent,
    children: [
      {
        path: 'map',
        component: SensingNodesMapComponent,
      },
      {
        path: 'table',
        component: SensingNodesTableComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensingNodesRoutingModule { }
