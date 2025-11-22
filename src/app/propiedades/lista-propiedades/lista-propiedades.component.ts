import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PropiedadesService, PropiedadResponse } from '../../services/propiedades.service';

@Component({
  selector: 'app-lista-propiedades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponent implements OnInit {
  loading = true;
  error = '';
  propiedades: PropiedadResponse[] = [];

  constructor(private svc: PropiedadesService) {}

  ngOnInit(): void {
    // Si quieres solo las del usuario usa: this.svc.misPropiedades()
    this.svc.listarTodas().subscribe({
      next: data => { this.propiedades = data ?? []; this.loading = false; },
      error: err => {
        this.error = (err?.message || 'No se pudo cargar la lista de propiedades.');
        this.loading = false;
      }
    });
  }
}
