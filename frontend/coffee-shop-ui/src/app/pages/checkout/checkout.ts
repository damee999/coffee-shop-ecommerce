import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cart: any = null;
  loading = true;
  submitting = false;
  orderPlaced = false;
  error: string | null = null;
  success: string | null = null;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadUserData();
  }

  loadCart(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.getCart(user.id).subscribe({
      next: (data) => {
        if (!data || data.items.length === 0) {
          this.router.navigate(['/cart']);
          return;
        }
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

  loadUserData(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.formData.firstName = user.firstName || '';
      this.formData.lastName = user.lastName || '';
      this.formData.email = user.email || '';
      this.formData.phone = user.phone || '';
      this.formData.address = user.address || '';
      this.formData.city = user.city || '';
      this.formData.zipCode = user.zipCode || '';
      this.cdr.markForCheck();
    }
  }

  onSubmitOrder(): void {
    if (!this.validateForm() || this.orderPlaced || this.submitting) {
      return;
    }

    this.submitting = true;
    this.cdr.markForCheck();
    const user = this.authService.getCurrentUser();

    const orderData = {
      userId: user.id,
      totalCents: this.cart.totalCents,
      items: this.cart.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceCents: item.priceCents
      }))
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.success = 'Order placed successfully!';
        this.orderPlaced = true;
        this.cdr.markForCheck();
        console.log('Order placed, attempting to clear cart for userId:', user.id);
        
        // Clear cart with retry logic
        const clearAndVerify = (attempt = 1) => {
          this.cartService.clearCart(user.id).subscribe({
            next: () => {
              console.log(`Clear cart request sent (attempt ${attempt})`);
              // Wait and verify
              setTimeout(() => {
                this.cartService.getCart(user.id).subscribe({
                  next: (cart) => {
                    console.log('Cart after clear verify:', cart);
                    if (cart.items.length === 0) {
                      console.log('✓ Cart successfully cleared!');
                      this.cartService.resetCartSubject();
                      setTimeout(() => this.router.navigate(['/']), 500);
                    } else if (attempt < 2) {
                      console.log('Cart still has items, retrying...');
                      clearAndVerify(attempt + 1);
                    } else {
                      console.warn('Cart still has items after retry');
                      this.cartService.resetCartSubject();
                      this.router.navigate(['/']);
                    }
                  },
                  error: (err) => {
                    console.error('Error verifying cart:', err);
                    this.cartService.resetCartSubject();
                    this.router.navigate(['/']);
                  }
                });
              }, 500);
            },
            error: (err) => {
              console.error('Clear cart request failed:', err);
              this.cartService.resetCartSubject();
              this.router.navigate(['/']);
            }
          });
        };
        
        clearAndVerify();
      },
      error: (err) => {
        console.error('Order creation error:', err);
        this.error = 'Failed to place order';
        this.submitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  validateForm(): boolean {
    if (!this.formData.firstName || !this.formData.lastName || !this.formData.email ||
        !this.formData.address || !this.formData.city || !this.formData.zipCode) {
      this.error = 'Please fill in all required fields';
      this.cdr.markForCheck();
      return false;
    }
    return true;
  }

  formatPrice(cents: number): string {
    return (cents / 100).toFixed(2);
  }
}
