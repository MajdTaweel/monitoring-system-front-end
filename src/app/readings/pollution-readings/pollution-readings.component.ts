import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PollutionReadings } from '../readings.model';
import { ReadingsService } from '../readings.service';

@Component({
  selector: 'app-pollution-readings',
  templateUrl: './pollution-readings.component.html',
  styleUrls: ['./pollution-readings.component.scss']
})
export class PollutionReadingsComponent implements OnInit {

  displayedColumns: string[] = ['air', 'sound'];
  dataSource = new MatTableDataSource<PollutionReadings>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading = true;

  private pollutionReadings: PollutionReadings[] = [];

  private sensingNodeId: number;

  constructor(private route: ActivatedRoute, private readingsService: ReadingsService) { }

  ngOnInit(): void {
    this.sensingNodeId = +this.route.snapshot.paramMap.get('sensingNodeId');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(event => this.onPageChange(event))
    this.dataSource.data = this.pollutionReadings;
    this.getNextPage(0, 0, this.paginator.pageSize);
  }

  private onPageChange(event: PageEvent): void {
    this.loading = true;
    const currentSize = event.pageSize * event.pageIndex;
    this.getNextPage(currentSize, event.pageIndex, event.pageSize)
  }

  private getNextPage(currentSize: number, page: number, size: number) {
    this.readingsService.getPollutionReadings(this.sensingNodeId, this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(data => {
        this.pollutionReadings.length = currentSize;
        this.pollutionReadings.push(...data.readings);
        this.pollutionReadings.length = data.size;
        this.dataSource._updateChangeSubscription();
        this.loading = false;
      });
  }
}
