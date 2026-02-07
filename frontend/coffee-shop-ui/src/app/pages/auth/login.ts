import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./auth.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setCurrentUser(response.user);
        this.router.navigate(['/catalog']);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
        this.loading = false;
      }
    });
  }
}
