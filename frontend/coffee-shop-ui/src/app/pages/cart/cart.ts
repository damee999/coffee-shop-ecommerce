import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../cart/cart';
import { OrdersService } from '../../orders/orders';
import { BeanOrdersService } from '../../bean-orders/bean-orders';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartPage {
  placingMenu = false;
  placingBeans = false;
  message = '';

  constructor(
    public cart: CartService,
    private orders: OrdersService,
    private beanOrders: BeanOrdersService
  ) {}

  placeMenuOrder(): void {
    const items = this.cart.getItems()
      .filter(i => i.item.kind === 'PRODUCT')
      .map(i => ({
        productId: i.item.id,
        qty: i.qty
      }));

    if (items.length === 0) {
      this.message = 'Add at least 1 menu product to place an order.';
      return;
    }

    this.placingMenu = true;
    this.message = '';

    this.orders.createOrder({ items }).subscribe({
      next: (res) => {
        // If you want to keep beans in cart after menu order, tell me and we’ll do "clear only PRODUCT"
        this.cart.clear();
        this.message = `✅ Menu order #${res.orderId} created. Total ${(res.totalCents / 100).toFixed(2)} €`;
        this.placingMenu = false;
        setTimeout(() => (this.message = ''), 5000);
      },
      error: () => {
        this.message = '❌ Failed to place menu order';
        this.placingMenu = false;
      }
    });
  }

  placeBeanOrder(): void {
    const items = this.cart.getItems()
      .filter(i => i.item.kind === 'BEAN')
      .map(i => ({
        beanId: i.item.id,
        qty: i.qty
      }));

    if (items.length === 0) {
      this.message = 'Add at least 1 coffee bean to place a bean order.';
      return;
    }

    this.placingBeans = true;
    this.message = '';

    this.beanOrders.createBeanOrder({ items }).subscribe({
      next: (res) => {
        // Same note: currently clears everything
        this.cart.clear();
        this.message = `✅ Bean order #${res.orderId} created. Total ${(res.totalCents / 100).toFixed(2)} €`;
        this.placingBeans = false;
        setTimeout(() => (this.message = ''), 5000);
      },
      error: () => {
        this.message = '❌ Failed to place bean order';
        this.placingBeans = false;
      }
    });
  }
}
