import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropiedadesService, PropiedadResponse } from '../../../app/services/propiedades.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-lista-propiedades',
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css'],
  standalone: true, 
  imports: [CommonModule] 
})
export class ListaPropiedadesComponent implements OnInit {
  propiedades: PropiedadResponse[] = [];
  cargando = true;

  constructor(
    private propiedadesService: PropiedadesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarPropiedades();
  }

  cargarPropiedades(): void {
    this.propiedadesService.listarTodas().subscribe({
      next: (data) => {
        this.propiedades = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar propiedades:', err);
        this.cargando = false;
      }
    });
  }
  
  editarPropiedad(id: string): void {
     this.router.navigate(['/propiedades/editar', id]); 
  }
}