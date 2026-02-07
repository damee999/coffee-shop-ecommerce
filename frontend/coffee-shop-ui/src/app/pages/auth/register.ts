import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./auth.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (!this.email || !this.password || !this.firstName || !this.lastName) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.authService.register(this.email, this.password, this.firstName, this.lastName).subscribe({
      next: (response) => {
        this.authService.setCurrentUser(response.user);
        this.router.navigate(['/catalog']);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
