import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <h1>Welcome to CoffeeShop ☕</h1>
      <p>Order your favorite drinks in seconds.</p>

      <div class="actions">
        <a class="btn" routerLink="/menu">Browse menu</a>
        <a class="btn ghost" routerLink="/admin/products">Admin</a>
      </div>
    </div>
  `,
  styles: [`
    .hero{
      padding: 48px 0;
      max-width: 900px;
      margin: 0 auto;
    }
    h1{ font-size: 42px; margin: 0 0 8px; }
    p{ font-size: 18px; color:#555; margin: 0 0 18px; }
    .actions{ display:flex; gap: 12px; margin-top: 18px; }
    .btn{
      display:inline-block;
      padding: 10px 14px;
      border-radius: 12px;
      background:#111;
      color:#fff;
      text-decoration:none;
      font-weight: 600;
    }
    .btn.ghost{
      background:#f2f2f2;
      color:#111;
    }
  `]
})
export class HomeComponent {}
