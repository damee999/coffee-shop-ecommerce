import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent implements OnInit {
  features = [
    {
      icon: '☕',
      title: 'Premium Selection',
      description: 'Hand-picked coffee beans from around the world',
      color: '#D2691E'
    },
    {
      icon: '🚚',
      title: 'Fast Shipping',
      description: 'Quick and reliable delivery to your doorstep',
      color: '#FF5722'
    },
    {
      icon: '💯',
      title: '100% Satisfaction',
      description: 'Money-back guarantee on all purchases',
      color: '#8B4513'
    },
    {
      icon: '🌱',
      title: 'Sustainable',
      description: 'Ethically sourced and environmentally friendly',
      color: '#A0522D'
    }
  ];

  testimonials = [
    {
      name: 'Sarah M.',
      text: 'Best coffee I\'ve ever had! The quality is incredible.',
      rating: 5
    },
    {
      name: 'John D.',
      text: 'Fast shipping and amazing customer service. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emma L.',
      text: 'Love the variety and the fresh taste. Will definitely order again.',
      rating: 5
    }
  ];

  recommendedProducts: any[] = [];
  loadingRecommended = true;
  recommendedError: string | null = null;
  cartMessage = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRecommended();
  }

  loadRecommended(): void {
    this.loadingRecommended = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        const active = (data || []).filter((p: any) => p.active !== false);
        // Add some mock properties for the catalog-style display
        this.recommendedProducts = active.slice(0, 4).map(p => ({
          ...p,
          rating: p.rating || 4.8,
          isNew: p.isNew || false,
          discount: p.discount || null,
          originalPrice: p.originalPrice || null
        }));
        this.loadingRecommended = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed loading recommended', err);
        this.recommendedError = 'Failed to load recommended products';
        this.loadingRecommended = false;
        this.cdr.markForCheck();
      }
    });
  }

  learnMore(): void {
    const element = document.querySelector('.recommended');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  addToCart(product: any): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.cartMessage = 'Please log in to add items to cart';
      this.cdr.markForCheck();
      setTimeout(() => {
        this.cartMessage = '';
        this.cdr.markForCheck();
      }, 3000);
      return;
    }

    this.cartService.addToCart(user.id, product.id, 1).subscribe({
      next: () => {
        this.cartMessage = `${product.name} added to cart!`;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.cartMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (err) => {
        this.cartMessage = 'Failed to add to cart';
        this.cdr.markForCheck();
        setTimeout(() => {
          this.cartMessage = '';
          this.cdr.markForCheck();
        }, 3000);
        console.error(err);
      }
    });
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'coffee': 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)',
      'equipment': 'linear-gradient(135deg, #2c1810 0%, #3d2516 100%)',
      'accessories': 'linear-gradient(135deg, #d2691e 0%, #ff8c00 100%)',
      'all': 'linear-gradient(135deg, #666 0%, #888 100%)'
    };
    return colors[category?.toLowerCase()] || colors['all'];
  }
}