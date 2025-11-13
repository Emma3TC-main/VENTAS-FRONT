import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Pago {
  id: string;
  fecha: string;
  monto: number;
  metodo: string;
  contratoId: string;
}

@Component({
  selector: 'app-pagos-list',
  templateUrl: './pagos-list.component.html',
  styleUrls: ['./pagos-list.component.css']
})
export class PagosListComponent implements OnInit {
  pagos: Pago[] = [];
  filteredPagos: Pago[] = [];
  filterForm: FormGroup;
  mostrarEstadisticas = false;

  // Formulario de edición
  editForm: FormGroup;
  editingPago: Pago | null = null;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      contratoId: [''],
      metodo: ['']
    });

    this.editForm = this.fb.group({
      fecha: [''],
      monto: [''],
      metodo: [''],
      contratoId: ['']
    });
  }

  ngOnInit(): void {
    this.loadPagos();

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  // Carga inicial de pagos
  loadPagos(): void {
    this.pagos = [
      { id: '1', fecha: '2024-06-01', monto: 1200, metodo: 'Transferencia', contratoId: 'C001' },
      { id: '2', fecha: '2024-06-10', monto: 1500, metodo: 'Efectivo', contratoId: 'C002' },
      { id: '3', fecha: '2024-06-15', monto: 1300, metodo: 'Tarjeta', contratoId: 'C001' }
    ];
    this.filteredPagos = [...this.pagos];
  }

  // -------------------------------
  // Filtros
  // -------------------------------
  applyFilters(): void {
    const { contratoId, metodo } = this.filterForm.value;
    this.filteredPagos = this.pagos.filter(p => {
      const matchContrato = contratoId
        ? p.contratoId.toLowerCase().includes(contratoId.toLowerCase())
        : true;
      const matchMetodo = metodo
        ? p.metodo.toLowerCase().includes(metodo.toLowerCase())
        : true;
      return matchContrato && matchMetodo;
    });
  }

  clearFilters(): void {
    this.filterForm.reset({ contratoId: '', metodo: '' });
    this.filteredPagos = [...this.pagos];
  }

  // -------------------------------
  // Estadísticas
  // -------------------------------
  getTotalMonto(): number {
    return this.filteredPagos.reduce((sum, p) => sum + (p.monto || 0), 0);
  }

  getPromedioMonto(): number {
    if (!this.filteredPagos.length) return 0;
    return this.getTotalMonto() / this.filteredPagos.length;
  }

  getPagosDelMes(): number {
    const now = new Date();
    return this.filteredPagos.filter(p => {
      const f = new Date(p.fecha);
      return f.getMonth() === now.getMonth() && f.getFullYear() === now.getFullYear();
    }).length;
  }

  getPagosPorMetodo(metodo: string): number {
    return this.filteredPagos.filter(p => p.metodo === metodo).length;
  }

  getCrecimientoMensual(): number {
    const now = new Date();
    const mesActual = this.filteredPagos.filter(p => {
      const f = new Date(p.fecha);
      return f.getMonth() === now.getMonth() && f.getFullYear() === now.getFullYear();
    }).length;

    const mesAnterior = this.filteredPagos.filter(p => {
      const f = new Date(p.fecha);
      const mes = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const anio = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return f.getMonth() === mes && f.getFullYear() === anio;
    }).length;

    if (mesAnterior === 0) return mesActual === 0 ? 0 : 100;
    return ((mesActual - mesAnterior) / mesAnterior) * 100;
  }

  // -------------------------------
  // Editar pagos
  // -------------------------------
  onEdit(pago: Pago): void {
    this.editingPago = pago;
    this.editForm.patchValue({
      fecha: pago.fecha,
      monto: pago.monto,
      metodo: pago.metodo,
      contratoId: pago.contratoId
    });
  }

  saveEdit(): void {
    if (this.editingPago) {
      Object.assign(this.editingPago, this.editForm.value);
      this.editingPago = null;
      this.editForm.reset();
    }
  }

  cancelEdit(): void {
    this.editingPago = null;
    this.editForm.reset();
  }

  // -------------------------------
  // Eliminar pagos
  // -------------------------------
  onDelete(id: string): void {
    this.pagos = this.pagos.filter(p => p.id !== id);
    this.applyFilters();
  }
}
