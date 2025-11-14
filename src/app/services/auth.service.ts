import { Injectable } from '@angular/core';

export interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuariosKey = 'usuarios';

  constructor() {}

  /** Login */
  login(email: string, password: string): boolean {
    const lista = this.getUsuarios();
    return lista.some((u: Usuario) => u.email === email && u.password === password);
  }

  /** Registrar usuario */
  registrar(nombre: string, email: string, password: string): void {
    const lista = this.getUsuarios();
    const nuevo: Usuario = { nombre, email, password };
    lista.push(nuevo);
    localStorage.setItem(this.usuariosKey, JSON.stringify(lista));
  }

  /** Verifica si ya existe el usuario */
  existeUsuario(email: string): boolean {
    const lista = this.getUsuarios();
    return lista.some((u: Usuario) => u.email === email);
  }

  /** Obtiene los usuarios registrados */
  getUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.usuariosKey) || '[]') as Usuario[];
  }
}
