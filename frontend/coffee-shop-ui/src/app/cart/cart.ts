import { Injectable } from '@angular/core';
import { SellableItem } from './sellable';

export interface CartItem {
  item: SellableItem;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  add(item: SellableItem): void {
    const found = this.items.find(i => i.item.kind === item.kind && i.item.id === item.id);
    if (found) found.qty += 1;
    else this.items.push({ item, qty: 1 });
  }

  inc(kind: SellableItem['kind'], id: number): void {
    const found = this.items.find(i => i.item.kind === kind && i.item.id === id);
    if (found) found.qty += 1;
  }

  dec(kind: SellableItem['kind'], id: number): void {
    const found = this.items.find(i => i.item.kind === kind && i.item.id === id);
    if (!found) return;
    found.qty -= 1;
    if (found.qty <= 0) {
      this.items = this.items.filter(i => !(i.item.kind === kind && i.item.id === id));
    }
  }

  removeKind(kind: SellableItem['kind']): void {
    this.items = this.items.filter(i => i.item.kind !== kind);
  }

  clear(): void {
    this.items = [];
  }

  totalCents(): number {
    return this.items.reduce((sum, i) => sum + i.item.priceCents * i.qty, 0);
  }
}
