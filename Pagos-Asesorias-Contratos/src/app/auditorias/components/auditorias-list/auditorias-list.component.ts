import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Auditoria {
  id: string;
  usuario: string;
  accion: string;
  fecha: string;
  detalle: string;
}

@Component({
  selector: 'app-auditorias-list',
  templateUrl: './auditorias-list.component.html',
  styleUrls: ['./auditorias-list.component.css']
})
export class AuditoriasListComponent implements OnInit {
  auditorias: Auditoria[] = [];
  filteredAuditorias: Auditoria[] = [];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      usuario: [''],
      accion: ['']
    });
  }

  ngOnInit(): void {
    this.loadAuditorias();

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadAuditorias(): void {
    // TODO: Replace with backend API call
    this.auditorias = [
      {
        id: 'a1',
        usuario: 'juanp',
        accion: 'Crear contrato',
        fecha: '2024-06-05T14:00:00Z',
        detalle: 'Contrato C001 creado por juanp'
      },
      {
        id: 'a2',
        usuario: 'maria',
        accion: 'Editar pago',
        fecha: '2024-06-10T10:30:00Z',
        detalle: 'Pago 2 modificado por maria'
      },
      {
        id: 'a3',
        usuario: 'juanp',
        accion: 'Eliminar contrato',
        fecha: '2024-06-12T09:15:00Z',
        detalle: 'Contrato C002 eliminado por juanp'
      }
    ];
    this.filteredAuditorias = [...this.auditorias];
  }

  applyFilters(): void {
    const { usuario, accion } = this.filterForm.value;
    this.filteredAuditorias = this.auditorias.filter(audit => {
      return (
        (usuario ? audit.usuario.toLowerCase().includes(usuario.toLowerCase()) : true) &&
        (accion ? audit.accion.toLowerCase().includes(accion.toLowerCase()) : true)
      );
    });
  }
}
