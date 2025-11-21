import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nombre: string = '';
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  successMsg: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  registrar(): void {

    // VALIDACIÓN BÁSICA
    if (!this.nombre || !this.email || !this.password) {
      this.errorMsg = "Todos los campos son obligatorios";
      this.successMsg = '';
      return;
    }

    // VALIDAR SI YA EXISTE
    if (this.auth.existeUsuario(this.email)) {
      this.errorMsg = "Este correo ya está registrado";
      this.successMsg = '';
      return;
    }

    // REGISTRO
    this.auth.registrar(this.nombre, this.email, this.password);

    this.errorMsg = '';
    this.successMsg = "Registro exitoso ✔";

    // REDIRECCIÓN AUTOMÁTICA AL LOGIN
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }
}
