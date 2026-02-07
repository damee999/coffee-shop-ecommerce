import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // ✅ add RouterLinkActive
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = null;
  cartItemCount = 0;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      if (user) {
        this.updateCartCount();
      }
    });

    this.cartService.cart$.subscribe((cart) => {
      if (cart) {
        this.cartItemCount = cart.itemCount || 0;
      }
    });
  }

  updateCartCount(): void {
    if (this.currentUser) {
      this.cartService.getCart(this.currentUser.id).subscribe({
        next: (cart) => {
          this.cartItemCount = cart.itemCount || 0;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
