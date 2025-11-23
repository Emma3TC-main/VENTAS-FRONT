// src/app/services/propiedades.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs'; 

export interface CrearPropiedadRequest {
  titulo: string;
  descripcion: string;
  calle: string; 
  distrito: string; 
  provincia: string;
  latitud: number;
  longitud: number;
  precio: number;
  moneda: string;
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
  private base = `${environment.apiBaseUrl}/v1/propiedades`; 

  listarTodas(): Observable<PropiedadResponse[]> {
    return this.http.get<PropiedadResponse[]>(this.base);
  }

  obtenerPorId(id: string): Observable<PropiedadResponse> {
    return this.http.get<PropiedadResponse>(`${this.base}/${id}`);
  }

  crear(body: CrearPropiedadRequest): Observable<PropiedadResponse> {
    return this.http.post<PropiedadResponse>(this.base, body); 
  }

  misPropiedades(): Observable<PropiedadResponse[]> {
    return this.http.get<PropiedadResponse[]>(`${this.base}/owner/mias`); 
  }

  actualizar(id: string, body: CrearPropiedadRequest): Observable<PropiedadResponse> {
    return this.http.put<PropiedadResponse>(`${this.base}/${id}`, body);
  }
}