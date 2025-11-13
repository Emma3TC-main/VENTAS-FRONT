import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Contrato {
  id: string;
  cliente: string;
  inmueble: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'inactivo';
}

@Component({
  selector: 'app-contratos-list',
  templateUrl: './contratos-list.component.html',
  styleUrls: ['./contratos-list.component.css']
})
export class ContratosListComponent implements OnInit {
  contratos: Contrato[] = [];
  filteredContratos: Contrato[] = [];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      cliente: [''],
      estado: ['']
    });
  }

  ngOnInit(): void {
    this.loadContratos();

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadContratos(): void {
    // TODO: Replace with backend API call
    this.contratos = [
      {
        id: 'C001',
        cliente: 'Juan Pérez',
        inmueble: 'Inmueble A',
        fechaInicio: '2024-01-01',
        fechaFin: '2025-01-01',
        estado: 'activo'
      },
      {
        id: 'C002',
        cliente: 'María López',
        inmueble: 'Inmueble B',
        fechaInicio: '2023-06-15',
        fechaFin: '2024-06-15',
        estado: 'inactivo'
      }
    ];
    this.filteredContratos = [...this.contratos];
  }

  applyFilters(): void {
    const { cliente, estado } = this.filterForm.value;
    this.filteredContratos = this.contratos.filter(cto => {
      return (
        (cliente ? cto.cliente.toLowerCase().includes(cliente.toLowerCase()) : true) &&
        (estado ? cto.estado === estado : true)
      );
    });
  }

  onEdit(contratoId: string): void {
    location.href = `/contratos/editar/${contratoId}`;
  }

  onDelete(contratoId: string): void {
    if (confirm('¿Está seguro de eliminar este contrato? Esta acción no se puede deshacer.')) {
      // TODO: Call backend to delete contrato
      this.contratos = this.contratos.filter(c => c.id !== contratoId);
      this.applyFilters();
    }
  }
}
