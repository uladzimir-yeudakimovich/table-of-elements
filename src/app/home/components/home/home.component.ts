import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element.model';
import { PeriodicElementService } from '../../services/periodic-element.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NgIf, MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [PeriodicElementService],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] | null = null;

  constructor(
    private periodicElementService: PeriodicElementService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.periodicElementService.getElements().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(res => this.dataSource = res);
  }
}
