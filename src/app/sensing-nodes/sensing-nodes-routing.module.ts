import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensingNodesComponent } from './sensing-nodes.component';

const routes: Routes = [{ path: '', component: SensingNodesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensingNodesRoutingModule { }
