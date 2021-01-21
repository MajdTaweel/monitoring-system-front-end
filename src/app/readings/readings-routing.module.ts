import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagnetometerReadingsComponent } from './magnetometer-readings/magnetometer-readings.component';
import { PollutionReadingsComponent } from './pollution-readings/pollution-readings.component';
import { ReadingsComponent } from './readings.component';

const routes: Routes = [
  {
    path: '',
    component: ReadingsComponent,
    children: [
      {
        path: 'magnetometer/:sensingNodeId',
        component: MagnetometerReadingsComponent,
      },
      {
        path: 'pollution/:sensingNodeId',
        component: PollutionReadingsComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sensing-nodes-monitoring',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingsRoutingModule { }
