import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  quantity = 1;
  loading = true;
  error = '';
  cartMessage = '';
  addingToCart = false;
  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
      this.loadRelatedProducts(id);
    });
  }

  loadProduct(id: number) {
    this.loading = true;
    if (this.productService.getProductById) {
      this.productService.getProductById(id).subscribe({
        next: (data: any) => {
          this.product = data;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err: any) => {
          this.error = 'Product not found';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      // Fallback: get from getAllProducts
      this.productService.getAllProducts().subscribe({
        next: (data: any[]) => {
          this.product = data.find(p => p.id === id);
          if (!this.product) {
            this.error = 'Product not found';
          }
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err: any) => {
          this.error = 'Failed to load product';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  loadRelatedProducts(currentProductId: number) {
    this.productService.getAllProducts().subscribe({
      next: (data: any[]) => {
        // Get 3 random products excluding current product
        this.relatedProducts = data
          .filter(p => p.id !== currentProductId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        this.cdr.markForCheck();
      }
    });
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.cartMessage = 'Please log in to add items to cart';
      this.cdr.markForCheck();
      setTimeout(() => {
        this.cartMessage = '';
        this.cdr.markForCheck();
      }, 3000);
      return;
    }

    this.addingToCart = true;
    const user = this.authService.getCurrentUser();

    this.cartService.addToCart(user.id, this.product.id, this.quantity).subscribe({
      next: () => {
        this.cartMessage = `✓ Added ${this.quantity}x ${this.product.name} to cart!`;
        this.quantity = 1;
        this.addingToCart = false;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.cartMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (err: any) => {
        this.cartMessage = 'Failed to add to cart';
        this.addingToCart = false;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.cartMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      }
    });
  }

  increaseQuantity() {
    if (this.quantity < 99) this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
    window.scrollTo(0, 0);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  formatPrice(cents: number | undefined): string {
    if (!cents) return '$0.00';
    return '$' + (cents / 100).toFixed(2);
  }
}
