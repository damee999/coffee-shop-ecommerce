import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateOrderRequest {
  items: { productId: number; qty: number }[];
}

export interface CreateOrderResponse {
  orderId: number;
  totalCents: number;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(payload: CreateOrderRequest): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(this.apiUrl, payload);
  }
}
