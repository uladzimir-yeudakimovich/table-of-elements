import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { PeriodicElement } from '../models/periodic-element.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodicElementService {
  private apiUrl = 'data/elements.json';

  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[] | null> {
    return this.http.get<PeriodicElement[]>(`${this.apiUrl}`).pipe(
      delay(2000),
    );
  }
}
