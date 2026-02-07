import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CoffeeBeanDto {
  id: number;
  name: string;
  origin: string;
  roast: string;
  tastingNotes?: string | null;
  priceCents: number;
  weightG: number;
  imageUrl?: string | null;
}

@Injectable({ providedIn: 'root' })
export class BeansService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  listBeans(): Observable<CoffeeBeanDto[]> {
    return this.http.get<CoffeeBeanDto[]>(`${this.baseUrl}/beans`);
  }
}
