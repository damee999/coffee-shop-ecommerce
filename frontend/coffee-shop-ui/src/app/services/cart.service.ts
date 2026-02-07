import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  private cartSubject = new BehaviorSubject<any>(null);
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/add`, {
      productId,
      quantity
    }).pipe(
      tap(() => this.getCart(userId).subscribe())
    );
  }

  updateCartItem(userId: number, cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/item/${cartItemId}`, {
      quantity
    }).pipe(
      tap(() => this.getCart(userId).subscribe())
    );
  }

  removeFromCart(userId: number, cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/item/${cartItemId}`).pipe(
      tap(() => this.getCart(userId).subscribe())
    );
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/clear`).pipe(
      tap(() => {
        this.cartSubject.next({ items: [], totalCents: 0, itemCount: 0 });
      })
    );
  }

  resetCartSubject(): void {
    this.cartSubject.next({ items: [], totalCents: 0, itemCount: 0 });
  }

  getCartValue(): any {
    return this.cartSubject.value;
  }
}
