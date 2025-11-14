import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nombre: string = '';
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.email || !this.password) {
      this.errorMsg = "Todos los campos son obligatorios";
      return;
    }

    if (this.auth.existeUsuario(this.email)) {
      this.errorMsg = "Este correo ya está registrado";
      return;
    }

    this.auth.registrar(this.nombre, this.email, this.password);

    this.successMsg = "Registro exitoso ✔";
    setTimeout(() => this.router.navigate(['/login']), 1000);
  }
}
