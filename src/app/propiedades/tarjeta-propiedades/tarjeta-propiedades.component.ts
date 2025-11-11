// src/app/propiedades/tarjeta-propiedades/tarjeta-propiedades.component.ts
import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Propiedad {
  id: number;
  nombre: string;
  direccion: string;
  rentaMes: number;
  estado: string;
  propietario: string;
  descripcionExterior: string;
  descripcionInterior: string;
  direccionCompleta: string;
}

@Component({
  selector: 'app-tarjeta-propiedad',
  templateUrl: './tarjeta-propiedades.component.html',
  styleUrls: ['./tarjeta-propiedades.component.css'],
  standalone: true, 
  imports: [ CommonModule, RouterLink ]
})

export class TarjetaPropiedadComponent {
  @Input() propiedad: any; 

  verInformacion() {
    console.log(`Ver información de la propiedad: ${this.propiedad.nombre}`);
  }
}