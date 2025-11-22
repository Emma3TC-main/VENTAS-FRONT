import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface PropiedadListadoExtendida {
  id: string;
  nombre: string;
  direccion: string;
  rentaMes: number;
  estado: 'Alquiler' | 'Venta' | 'Ocupada' | 'Mantenimiento'; 
  imagenUrl: string[];
}

@Component({
  selector: 'app-propiedades-vista-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './propiedades-vista-usuario.component.html',
})
export class PropiedadesVistaUsuarioComponent implements OnInit {

  propiedades: PropiedadListadoExtendida[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cargarPropiedadesEjemplo();
  }

  cargarPropiedadesEjemplo(): void {
    this.propiedades = [
      {
        id: '1',
        nombre: 'Acogedor Apartamento en el Centro',
        direccion: 'Calle Falsa 123, Miraflores',
        rentaMes: 850,
        estado: 'Alquiler',
        imagenUrl: [
          'https://placehold.co/600x400/0F766E/ffffff?text=Apto+1%2FSala',
          'https://placehold.co/600x400/0F766E/ffffff?text=Apto+1%2FCocina',
          'https://placehold.co/600x400/0F766E/ffffff?text=Apto+1%2FDormitorio',
        ]
      },
      {
        id: '2',
        nombre: 'Casa Moderna con Jardín',
        direccion: 'Av. Siempre Viva 742, La Molina',
        rentaMes: 250000,
        estado: 'Venta',
        imagenUrl: [
          'https://placehold.co/600x400/C2410C/ffffff?text=Casa+2%2FExterior',
          'https://placehold.co/600x400/C2410C/ffffff?text=Casa+2%2FPiscina',
          'https://placehold.co/600x400/C2410C/ffffff?text=Casa+2%2FSala',
        ]
      },
      {
        id: '3',
        nombre: 'Estudio de Lujo',
        direccion: 'Paseo de la República 456, San Isidro',
        rentaMes: 1100,
        estado: 'Alquiler',
        imagenUrl: [
          'https://placehold.co/600x400/1D4ED8/ffffff?text=Estudio+3%2FInterior',
          'https://placehold.co/600x400/1D4ED8/ffffff?text=Estudio+3%2FTerraza',
          'https://placehold.co/600x400/1D4ED8/ffffff?text=Estudio+3%2FBaño',
        ]
      },
      {
        id: '4',
        nombre: 'Loft Industrial',
        direccion: 'Jr. Unión 88, Barranco',
        rentaMes: 950,
        estado: 'Alquiler',
        imagenUrl: [
          'https://placehold.co/600x400/4F46E5/ffffff?text=Loft+4%2FGeneral',
          'https://placehold.co/600x400/4F46E5/ffffff?text=Loft+4%2FDetalle',
          'https://placehold.co/600x400/4F46E5/ffffff?text=Loft+4%2FVista',
        ]
      },
      {
        id: '5',
        nombre: 'Departamento Penthouse con Vista al Mar',
        direccion: 'Malecón Cisneros 100, Miraflores',
        rentaMes: 550000,
        estado: 'Venta',
        imagenUrl: [
          'https://placehold.co/600x400/BE123C/ffffff?text=Penthouse+5%2FVista',
          'https://placehold.co/600x400/BE123C/ffffff?text=Penthouse+5%2FMaster',
          'https://placehold.co/600x400/BE123C/ffffff?text=Penthouse+5%2FComedor',
        ]
      },
      {
        id: '6',
        nombre: 'Oficina Ejecutiva AAA',
        direccion: 'Av. Las Palmeras 200, San Borja',
        rentaMes: 3000,
        estado: 'Alquiler',
        imagenUrl: [
          'https://placehold.co/600x400/059669/ffffff?text=Oficina+6%2FRecepción',
          'https://placehold.co/600x400/059669/ffffff?text=Oficina+6%2FSala+Reuniones',
          'https://placehold.co/600x400/059669/ffffff?text=Oficina+6%2FKitchenette',
        ]
      },
    ];
  }
}