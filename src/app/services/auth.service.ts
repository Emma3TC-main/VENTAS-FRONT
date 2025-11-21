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
  private usuarioActualKey = 'usuarioActual';

  constructor() {}

  /** LOGIN */
  login(email: string, password: string): boolean {
    const lista = this.getUsuarios();

    const encontrado = lista.find(
      (u: Usuario) => u.email === email && u.password === password
    );

    if (encontrado) {
      // Guardamos el usuario actual en localStorage para simular sesión
      localStorage.setItem(this.usuarioActualKey, JSON.stringify(encontrado));
      return true;
    }

    return false;
  }

  /** REGISTRAR USUARIO */
  registrar(nombre: string, email: string, password: string): void {
    const lista = this.getUsuarios();

    const nuevo: Usuario = { nombre, email, password };
    lista.push(nuevo);

    localStorage.setItem(this.usuariosKey, JSON.stringify(lista));
  }

  /** VERIFICA SI YA EXISTE EL USUARIO POR EMAIL */
  existeUsuario(email: string): boolean {
    const lista = this.getUsuarios();
    return lista.some((u: Usuario) => u.email === email);
  }

  /** OBTIENE TODOS LOS USUARIOS REGISTRADOS (SIMULADO) */
  getUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(this.usuariosKey) || '[]') as Usuario[];
  }

  /** OBTIENE EL USUARIO ACTUALMENTE LOGUEADO (SI HAY) */
  getUsuarioActual(): Usuario | null {
    const data = localStorage.getItem(this.usuarioActualKey);
    if (!data) return null;

    try {
      return JSON.parse(data) as Usuario;
    } catch {
      return null;
    }
  }

  /** ¿HAY ALGUIEN LOGUEADO? */
  isLoggedIn(): boolean {
    return this.getUsuarioActual() !== null;
  }

  /** CERRAR SESIÓN */
  logout(): void {
    localStorage.removeItem(this.usuarioActualKey);
  }

  /** LIMPIAR TODO (POR SI QUIERES PROBAR DESDE CERO) */
  clearAll(): void {
    localStorage.removeItem(this.usuariosKey);
    localStorage.removeItem(this.usuarioActualKey);
  }
}
