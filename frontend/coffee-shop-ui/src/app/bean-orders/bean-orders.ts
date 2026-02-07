import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateBeanOrderRequest {
  items: { beanId: number; qty: number }[];
}

export interface CreateBeanOrderResponse {
  orderId: number;
  totalCents: number;
}

@Injectable({ providedIn: 'root' })
export class BeanOrdersService {
  private apiUrl = 'http://localhost:8080/api/bean-orders';

  constructor(private http: HttpClient) {}

  createBeanOrder(payload: CreateBeanOrderRequest): Observable<CreateBeanOrderResponse> {
    return this.http.post<CreateBeanOrderResponse>(this.apiUrl, payload);
  }
}
