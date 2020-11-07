import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MagnetometerReadings } from '../readings.model';
import { ReadingsService } from '../readings.service';

@Component({
  selector: 'app-magnetometer-readings',
  templateUrl: './magnetometer-readings.component.html',
  styleUrls: ['./magnetometer-readings.component.scss']
})
export class MagnetometerReadingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['x', 'y', 'z', 'rms'];
  dataSource = new MatTableDataSource<MagnetometerReadings>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private readingsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private readingsService: ReadingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    const sensingNodeId = +this.route.snapshot.paramMap.get('sensingNodeId');
    this.readingsSubscription = this.readingsService.getMagnetometerReadings(sensingNodeId)
      .subscribe(readings => this.dataSource.data = readings);
  }

  ngOnDestroy(): void {
    if (this.readingsSubscription) {
      this.readingsSubscription.unsubscribe();
    }
  }
}
