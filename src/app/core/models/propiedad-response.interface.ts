// src/app/models/propiedad-response.interface.ts

import { PropiedadBase } from "./propiedad-base.interface";

export interface PropiedadResponse extends PropiedadBase {
  id: string; 
  ownerId: string; 
  
}