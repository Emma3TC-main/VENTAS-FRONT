import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UsuarioDTO } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.errorMsg = '';
    if (!this.email || !this.password) {
      this.errorMsg = 'Completa tu correo y contraseña';
      return;
    }
    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.auth.me().subscribe({
          next: (user: UsuarioDTO) => {
            this.loading = false;
            const plan = (user?.tipoCuenta || 'FREE').toUpperCase();
            this.router.navigate([plan === 'PREMIUM' ? '/dashboard-premium' : '/inicio-free']);
          },
          error: e => { this.loading = false; this.errorMsg = e.message || 'No se pudo obtener el usuario actual'; }
        });
      },
      error: e => { this.loading = false; this.errorMsg = e.message || 'Correo o contraseña incorrectos'; }
    });
  }
}
