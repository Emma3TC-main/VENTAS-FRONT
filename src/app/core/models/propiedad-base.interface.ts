// src/app/models/propiedad-base.interface.ts
import { Precio } from './precio.interface';
import { Ubicacion } from './ubicacion.interface';

export interface PropiedadBase {
  titulo: string;
  descripcion: string;
  ubicacion: Ubicacion;
  precio: Precio;
}