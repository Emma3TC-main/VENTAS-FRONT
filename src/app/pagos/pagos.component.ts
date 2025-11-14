import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pago {
  id: number;
  cliente: string;
  monto: number;
  fecha: Date;
  estado: 'Completado' | 'Pendiente' | 'Anulado';
  metodo: 'Efectivo' | 'Tarjeta' | 'Transferencia';
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
})
export class PagosComponent {

  // Campos del formulario
  cliente: string = '';
  monto: number | null = null;
  metodoSeleccionado: 'Efectivo' | 'Tarjeta' | 'Transferencia' = 'Efectivo';
  filtro: string = '';

  // Lista de pagos
  listaPagos: Pago[] = [];

  private ultimoId = 0;

  // ---------------- REGISTRAR PAGO ----------------
  registrarPago(): void {
    if (!this.cliente.trim() || this.monto === null || this.monto <= 0) {
      alert('Completa los campos correctamente');
      return;
    }

    const nuevoPago: Pago = {
      id: ++this.ultimoId,
      cliente: this.cliente.trim(),
      monto: this.monto,
      fecha: new Date(),
      estado: 'Completado',
      metodo: this.metodoSeleccionado
    };

    this.listaPagos.push(nuevoPago);
    this.actualizarEstadisticas();
    this.resetFormulario();
  }

  // ---------------- FILTRO ----------------
  get pagosFiltrados(): Pago[] {
    const txt = this.filtro.toLowerCase().trim();

    return txt
      ? this.listaPagos.filter(p =>
          p.cliente.toLowerCase().includes(txt) ||
          p.metodo.toLowerCase().includes(txt)
        )
      : this.listaPagos;
  }

  // ---------------- ESTADÍSTICAS ----------------
  totalPagos: number = 0;
  totalRecaudado: number = 0;
  metodoMasUsado: string = '';

  private actualizarEstadisticas(): void {
    this.totalPagos = this.listaPagos.length;

    this.totalRecaudado = this.listaPagos.reduce(
      (acc, pago) => acc + pago.monto,
      0
    );

    const contador: Record<string, number> = {};

    this.listaPagos.forEach(p => {
      contador[p.metodo] = (contador[p.metodo] || 0) + 1;
    });

    this.metodoMasUsado = Object.keys(contador).length
      ? Object.entries(contador).sort((a, b) => b[1] - a[1])[0][0]
      : '';
  }

  get totalEfectivo(): number {
    return this.listaPagos.filter(p => p.metodo === 'Efectivo').length;
  }

  get totalTarjeta(): number {
    return this.listaPagos.filter(p => p.metodo === 'Tarjeta').length;
  }

  get totalTransferencia(): number {
    return this.listaPagos.filter(p => p.metodo === 'Transferencia').length;
  }

  // ---------------- ELIMINAR ----------------
  eliminarPago(id: number): void {
    this.listaPagos = this.listaPagos.filter(p => p.id !== id);
    this.actualizarEstadisticas();
  }

  // ---------------- UTILS ----------------
  formatearFecha(d: Date): string {
    return new Date(d).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  private resetFormulario(): void {
    this.cliente = '';
    this.monto = null;
    this.metodoSeleccionado = 'Efectivo';
  }
}
