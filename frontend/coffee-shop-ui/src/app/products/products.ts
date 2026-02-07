import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(payload: {
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
}): Observable<Product> {
  return this.http.post<Product>(this.apiUrl, payload);
}

deactivateProduct(id: number): Observable<void> {
  return this.http.patch<void>(`${this.apiUrl}/${id}/deactivate`, {});
}

}


