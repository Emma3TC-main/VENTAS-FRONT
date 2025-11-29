import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PropiedadesService, PropiedadResponse } from '../../services/propiedades.service';
import { finalize } from 'rxjs/operators';
import { DetallesPropiedadUsuarioComponent } from '../detalles-propiedad-usuario/detalles-propiedad-usuario.component'; 

interface PropiedadListadoExtendida {
  id: string;
  nombre: string; 
  direccion: string;
  rentaMes: number | null;
  estado: 'Alquiler' | 'Venta' | 'Ocupada' | 'Mantenimiento' | 'Pendiente'; 
  imagenUrl: string[]; 
}

@Component({
  selector: 'app-propiedades-vista-usuario',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    CurrencyPipe, 
    RouterOutlet,
    DetallesPropiedadUsuarioComponent 
],
  templateUrl: './propiedades-vista-usuario.component.html',
})
export class PropiedadesVistaUsuarioComponent implements OnInit {

  private svc = inject(PropiedadesService);

  propiedades: PropiedadListadoExtendida[] = [];
  loading = true; 
  errorCargando = false; 

  selectedPropertyId: string | null = null;
  showModal: boolean = false; 
  
  constructor() { } 

  ngOnInit(): void {
    this.cargarPropiedades(); 
  }

  cargarPropiedades(): void {
    this.loading = true;
    this.errorCargando = false;
    
    this.svc.listarTodas().pipe(
        finalize(() => this.loading = false) 
    ).subscribe({
      next: (data: PropiedadResponse[]) => {
        this.propiedades = data.map(p => this.mapToVista(p));
        console.log('Propiedades cargadas:', this.propiedades);
      },
      error: (err) => {
        console.error('Error al cargar propiedades públicas:', err);
        this.errorCargando = true;
        this.propiedades = [];
      }
    });
  }
  
  private mapToVista(p: PropiedadResponse): PropiedadListadoExtendida {
    return {
      id: p.id,
      nombre: p.titulo,
      direccion: `${p.calle}, ${p.distrito}, ${p.provincia}`, 
      rentaMes: p.precio,
      estado: 'Alquiler', 
      imagenUrl: ['https://placehold.co/600x400/0F766E/ffffff?text=iRentA+Propiedad'], 
    };
  }

  verDetallesEnModal(propiedadId: string): void {
    this.selectedPropertyId = propiedadId;
    this.showModal = true;
  }
  
  cerrarModal(): void {
    this.showModal = false;
    this.selectedPropertyId = null;
  }
}