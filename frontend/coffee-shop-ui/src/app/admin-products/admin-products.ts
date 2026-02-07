import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../products/products';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrls: ['./admin-products.css']
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = [];
  loading = true;
  saving = false;

  // simple form model
  name = '';
  description = '';
  priceEuros = 0; // UI-friendly
  imageUrl = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.load();
  }



  load(): void {
    this.loading = true;
    this.productsService.getProducts()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.products = data,
        error: (err) => console.error('Admin load error:', err)
      });
  }


  create(): void {
    if (!this.name.trim()) return;

    this.saving = true;

    const payload = {
      name: this.name.trim(),
      description: this.description.trim() || '',
      priceCents: Math.round(this.priceEuros * 100),
      imageUrl: this.imageUrl.trim() ? this.imageUrl.trim() : null
    };

    this.productsService.createProduct(payload)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          // reset form
          this.name = '';
          this.description = '';
          this.priceEuros = 0;
          this.imageUrl = '';
          this.load();
        },
        error: (err) => console.error(err)
      });
  }

  deactivate(id: number): void {
    this.productsService.deactivateProduct(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }
}
