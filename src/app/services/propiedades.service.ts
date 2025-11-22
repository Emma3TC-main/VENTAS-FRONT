// src/app/services/propiedades.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface CrearPropiedadRequest {
  titulo: string;
  descripcion: string;
  calle: string;
  distrito: string;
  provincia: string;
  latitud: number;
  longitud: number;
  precio: number;
  moneda: string; // 'PEN', 'USD', etc.
}
export interface PropiedadResponse {
  id: string;
  ownerId: string;
  titulo: string;
  descripcion: string;
  calle: string;
  distrito: string;
  provincia: string;
  latitud: number;
  longitud: number;
  precio: number | null;
  moneda: string | null;
}

@Injectable({ providedIn: 'root' })
export class PropiedadesService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/propiedades`;

  listarTodas() {
    return this.http.get<PropiedadResponse[]>(this.base);
  }

  obtenerPorId(id: string) {
    return this.http.get<PropiedadResponse>(`${this.base}/${id}`);
  }

  crear(body: CrearPropiedadRequest) {
    return this.http.post<PropiedadResponse>(this.base, body); // JWT va por interceptor
  }

  misPropiedades() {
    return this.http.get<PropiedadResponse[]>(`${this.base}/mias`);
  }
}
