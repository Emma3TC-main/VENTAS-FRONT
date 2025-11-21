import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {
    // limpiar error anterior
    this.errorMsg = '';

    // validación básica
    if (!this.email || !this.password) {
      this.errorMsg = 'Completa tu correo y contraseña';
      return;
    }

    const result = this.auth.login(this.email, this.password);

    if (result) {
      // Usuario autenticado: lo llevamos al dashboard Premium
      this.router.navigate(['/dashboard-premium']);
    } else {
      this.errorMsg = 'Correo o contraseña incorrectos';
    }
  }
}
