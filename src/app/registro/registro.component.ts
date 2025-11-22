import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  registrar(): void {
    this.errorMsg = ''; this.successMsg = '';
    if (!this.nombre || !this.email || !this.password) {
      this.errorMsg = 'Todos los campos son obligatorios'; return;
    }
    this.loading = true;

    this.auth.registrar(this.nombre, this.email, this.password).subscribe({
      next: () => { this.loading = false; this.successMsg = 'Registro exitoso ✔'; setTimeout(() => this.router.navigate(['/login']), 1200); },
      error: e => { this.loading = false; this.errorMsg = e.message || 'No se pudo completar el registro'; }
    });
  }
}
