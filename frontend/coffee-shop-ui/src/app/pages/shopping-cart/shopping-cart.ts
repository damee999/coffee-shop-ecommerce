import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shopping-cart.html',
  styleUrls: ['./shopping-cart.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.getCart(user.id).subscribe({
      next: (data) => {
        this.cart = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Failed to load cart';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    const user = this.authService.getCurrentUser();
    if (!user || quantity < 1) return;

    this.cartService.updateCartItem(user.id, cartItemId, quantity).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        this.error = 'Failed to update item';
      }
    });
  }

  removeItem(cartItemId: number): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.cartService.removeFromCart(user.id, cartItemId).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        this.error = 'Failed to remove item';
      }
    });
  }

  clearCart(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.cartService.clearCart(user.id).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        this.error = 'Failed to clear cart';
      }
    });
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  formatPrice(cents: number): string {
    return (cents / 100).toFixed(2);
  }
}
