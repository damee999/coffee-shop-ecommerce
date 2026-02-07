import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../products/products';
import { finalize } from 'rxjs';
import { CartService } from '../cart/cart';
import { SellableItem } from '../cart/sellable'; // ✅ add this

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private productsService: ProductsService,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.productsService.getProducts()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.products = data,
        error: (err) => console.error('Menu load error:', err)
      });
  }

  asSellableProduct(p: Product): SellableItem {
    return {
      kind: 'PRODUCT',
      id: p.id,
      name: p.name,
      priceCents: p.priceCents,
      imageUrl: p.imageUrl ?? null
    };
  }
}
