import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    const result = this.auth.login(this.email, this.password);

    if (result) {
      // Cambia la navegación a una ruta REAL de tu proyecto
      this.router.navigate(['/']);
      // Ejemplos alternativos:
      // this.router.navigate(['/propiedades']);
      // this.router.navigate(['/reportes']);
    } else {
      this.errorMsg = 'Correo o contraseña incorrectos';
    }
  }
}
