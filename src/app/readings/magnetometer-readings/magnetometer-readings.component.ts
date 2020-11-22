import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MagnetometerReadings } from '../readings.model';
import { ReadingsService } from '../readings.service';

@Component({
  selector: 'app-magnetometer-readings',
  templateUrl: './magnetometer-readings.component.html',
  styleUrls: ['./magnetometer-readings.component.scss']
})
export class MagnetometerReadingsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['x', 'y', 'z', 'rms'];
  dataSource = new MatTableDataSource<MagnetometerReadings>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading = true;

  private magnetometerReadings: MagnetometerReadings[] = [];

  private sensingNodeId: number;

  constructor(private route: ActivatedRoute, private readingsService: ReadingsService) { }

  ngOnInit(): void {
    this.sensingNodeId = +this.route.snapshot.paramMap.get('sensingNodeId');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(event => this.onPageChange(event))
    this.dataSource.data = this.magnetometerReadings;
    this.getNextPage(0, 0, this.paginator.pageSize);
  }

  private onPageChange(event: PageEvent): void {
    this.loading = true;
    const currentSize = event.pageSize * event.pageIndex;
    this.getNextPage(currentSize, event.pageIndex, event.pageSize)
  }

  private getNextPage(currentSize: number, page: number, size: number) {
    this.readingsService.getMagnetometerReadings(this.sensingNodeId, this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(data => {
        this.magnetometerReadings.length = currentSize;
        this.magnetometerReadings.push(...data.readings);
        this.magnetometerReadings.length = data.size;
        this.dataSource._updateChangeSubscription();
        this.loading = false;
      });
  }
}
