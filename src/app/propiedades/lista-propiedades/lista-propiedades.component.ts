// src/app/propiedades/lista-propiedades/lista-propiedades.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Propiedad } from '../tarjeta-propiedades/tarjeta-propiedades.component';

@Component({
  selector: 'app-lista-propiedades',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './lista-propiedades.component.html',
  styleUrl: './lista-propiedades.component.css'
})
export class ListaPropiedadesComponent {

  propiedades: Propiedad[] = [
    {
      id: 1,
      nombre: 'Apartamento de Lujo Vista Mar',
      direccion: 'Avenida del Sol 101',
      rentaMes: 2500,
      estado: 'Disponible',
      propietario: 'Juan Pérez',
      descripcionExterior: 'Grandes jardines y fachada de piedra.',
      descripcionInterior: '3 habitaciones, 2 baños, cocina integral.',
      direccionCompleta: 'Avenida del Sol 101, Marbella, España'
    },
    {
      id: 2,
      nombre: 'Casa Familiar en Zona Tranquila',
      direccion: 'Calle de la Paz 5',
      rentaMes: 1500,
      estado: 'Ocupada',
      propietario: 'María García',
      descripcionExterior: 'Descripción exterior de Casa Familiar.',
      descripcionInterior: 'Descripción interior de Casa Familiar.',
      direccionCompleta: 'Calle de la Paz 5, Colonia del Valle, México'
    },
    {
        id: 3,
        nombre: 'Estudio Loft Céntrico',
        direccion: 'Paseo de la Reforma 20',
        rentaMes: 1200,
        estado: 'Disponible',
        propietario: 'Ricardo López',
        descripcionExterior: 'Edificio moderno con seguridad 24h.',
        descripcionInterior: 'Un solo espacio diáfano con terraza.',
        direccionCompleta: 'Paseo de la Reforma 20, Colonia Juárez, México'
    },
    {
        id: 4,
        nombre: 'Chalet con Piscina y Jardín',
        direccion: 'Ronda de los Olivos 55',
        rentaMes: 3800,
        estado: 'En Mantenimiento',
        propietario: 'Elena Torres',
        descripcionExterior: 'Gran piscina y barbacoa exterior.',
        descripcionInterior: '5 habitaciones, 4 baños, acabados de lujo.',
        direccionCompleta: 'Ronda de los Olivos 55, Las Rozas, España'
    },
    {
        id: 5,
        nombre: 'Duplex cerca de Universidad',
        direccion: 'Avenida Universitaria 12',
        rentaMes: 1800,
        estado: 'Ocupada',
        propietario: 'Pedro Martínez',
        descripcionExterior: 'Excelente acceso a transporte público.',
        descripcionInterior: '2 plantas, 3 habitaciones, ideal para estudiantes.',
        direccionCompleta: 'Avenida Universitaria 12, Salamanca, España'
    },
    {
        id: 6,
        nombre: 'Casa de Campo Aislada',
        direccion: 'Carretera Vieja Km 15',
        rentaMes: 950,
        estado: 'Disponible',
        propietario: 'Sofía Díaz',
        descripcionExterior: 'Terreno amplio con árboles frutales.',
        descripcionInterior: 'Construcción rústica con chimenea.',
        direccionCompleta: 'Carretera Vieja Km 15, Sierra Nevada, México'
    },
  ];
}