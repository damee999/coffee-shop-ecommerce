import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { TruncatePipe } from '../../pipes/truncate.pipe'; // Create this file

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe], // Add TruncatePipe here
  templateUrl: './product-catalog.html',
  styleUrls: ['./product-catalog.css']
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory = 'all';
  searchTerm = '';
  sortBy = 'name';
  loading = true;
  error: string | null = null;
  cartMessage = '';

  categories = [
    { value: 'all', label: 'All Products' },
    { value: 'coffee', label: 'Coffee Beans' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'accessories', label: 'Accessories' }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        this.cdr.markForCheck();
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];

    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.sortProducts(filtered);
    this.filteredProducts = filtered;
    this.cdr.markForCheck();
  }

  sortProducts(products: any[]): void {
    switch (this.sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case 'price-desc':
        products.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case 'name':
      default:
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
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
      }
    });
  }

  formatPrice(cents: number): string {
    return (cents / 100).toFixed(2);
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'coffee': 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)',
      'equipment': 'linear-gradient(135deg, #2c1810 0%, #3d2516 100%)',
      'accessories': 'linear-gradient(135deg, #d2691e 0%, #ff8c00 100%)',
      'all': 'linear-gradient(135deg, #666 0%, #888 100%)'
    };
    return colors[category] || colors['all'];
  }

  getCategoryCount(category: string): number {
    if (category === 'all') return this.products.length;
    return this.products.filter(p => p.category === category).length;
  }

  getPriceRange(): string {
    if (this.filteredProducts.length === 0) return '$0.00';
    
    const prices = this.filteredProducts.map(p => p.priceCents / 100);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    if (min === max) return `$${min.toFixed(2)}`;
    return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.sortBy = 'name';
    this.applyFilters();
  }
}