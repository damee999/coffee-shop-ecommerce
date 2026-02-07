import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeansService, CoffeeBeanDto } from '../../services/beans.service';
import { CartService } from '../../cart/cart';
import { SellableItem } from '../../cart/sellable';


@Component({
  selector: 'app-beans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beans.html',
  styleUrls: ['./beans.css']
})
export class BeansPage implements OnInit {
  loading = true;
  beans: CoffeeBeanDto[] = [];

  constructor(private beansApi: BeansService, public cart: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.beansApi.listBeans().subscribe({
      next: (data) => { this.beans = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

addToCart(bean: CoffeeBeanDto) {
  const item: SellableItem = {
    kind: 'BEAN',
    id: bean.id,
    name: bean.name,
    priceCents: bean.priceCents,
    imageUrl: bean.imageUrl ?? null,
    meta: {
      origin: bean.origin,
      roast: bean.roast
    }
  };

  this.cart.add(item);
}

  euros(cents: number): string {
    return (cents / 100).toFixed(2) + ' €';
  }
}
