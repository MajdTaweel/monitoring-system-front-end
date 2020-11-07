import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingsRoutingModule } from './readings-routing.module';
import { ReadingsComponent } from './readings.component';
import { MagnetometerReadingsComponent } from './magnetometer-readings/magnetometer-readings.component';
import { PollutionReadingsComponent } from './pollution-readings/pollution-readings.component';
import { NbCardModule } from '@nebular/theme';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [ReadingsComponent, MagnetometerReadingsComponent, PollutionReadingsComponent],
  imports: [
    CommonModule,
    ReadingsRoutingModule,
    NbCardModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class ReadingsModule { }
