import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { ProductCatalogComponent } from './pages/catalog/product-catalog';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { LoginComponent } from './pages/auth/login';
import { RegisterComponent } from './pages/auth/register';
import { AdminProductsComponent } from './admin-products/admin-products';
import { ProductDetailsComponent } from './pages/products/product-details';

export const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'catalog', component: ProductCatalogComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin/products', component: AdminProductsComponent },

  { path: '**', redirectTo: '' },
];
