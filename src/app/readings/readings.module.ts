import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingsRoutingModule } from './readings-routing.module';
import { ReadingsComponent } from './readings.component';
import { MagnetometerReadingsComponent } from './magnetometer-readings/magnetometer-readings.component';
import { PollutionReadingsComponent } from './pollution-readings/pollution-readings.component';
import { NbCardModule } from '@nebular/theme';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [ReadingsComponent, MagnetometerReadingsComponent, PollutionReadingsComponent],
  imports: [
    CommonModule,
    ReadingsRoutingModule,
    NbCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ]
})
export class ReadingsModule { }
