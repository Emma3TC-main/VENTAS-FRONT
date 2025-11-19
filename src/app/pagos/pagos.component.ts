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

  // TARJETA
  tipoTarjeta?: '' | 'Visa' | 'Mastercard' | 'Diners Club' | 'American Express';
  numTarjeta?: string;
  cvv?: string;

  // TRANSFERENCIA
  numOperacion?: string;
  banco?: string;
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.component.html',
})
export class PagosComponent {

  cliente: string = '';
  monto: number | null = null;
  metodoSeleccionado: 'Efectivo' | 'Tarjeta' | 'Transferencia' = 'Efectivo';

  // TARJETA
  tipoTarjeta: '' | 'Visa' | 'Mastercard' | 'Diners Club' | 'American Express' = '';
  numTarjeta: string = '';
  cvv: string = '';

  // TRANSFERENCIA
  numOperacion: string = '';
  banco: string = '';

  filtro: string = '';
  listaPagos: Pago[] = [];

  private ultimoId = 0;

  registrarPago(): void {
    if (!this.cliente.trim() || this.monto === null || this.monto <= 0) {
      alert('Completa los campos correctamente');
      return;
    }

    // VALIDACIONES TARJETA
    if (this.metodoSeleccionado === 'Tarjeta') {
      if (!this.tipoTarjeta) {
        alert('Selecciona el tipo de tarjeta');
        return;
      }
      if (!this.numTarjeta.trim()) {
        alert('Ingresa el número de tarjeta');
        return;
      }
      if (!this.cvv.trim()) {
        alert('Ingresa el CVV');
        return;
      }
    }

    // VALIDACIONES TRANSFERENCIA
    if (this.metodoSeleccionado === 'Transferencia') {
      if (!this.numOperacion.trim()) {
        alert('Ingresa el número de operación');
        return;
      }
      if (!this.banco.trim()) {
        alert('Ingresa el banco');
        return;
      }
    }

    const nuevoPago: Pago = {
      id: ++this.ultimoId,
      cliente: this.cliente.trim(),
      monto: this.monto,
      fecha: new Date(),
      estado: 'Completado',
      metodo: this.metodoSeleccionado,

      // TARJETA
      tipoTarjeta: this.metodoSeleccionado === 'Tarjeta' ? this.tipoTarjeta : '',
      numTarjeta: this.metodoSeleccionado === 'Tarjeta' ? this.numTarjeta : '',
      cvv: this.metodoSeleccionado === 'Tarjeta' ? this.cvv : '',

      // TRANSFERENCIA
      numOperacion: this.metodoSeleccionado === 'Transferencia' ? this.numOperacion : '',
      banco: this.metodoSeleccionado === 'Transferencia' ? this.banco : '',
    };

    this.listaPagos.push(nuevoPago);
    this.actualizarEstadisticas();
    this.resetFormulario();
  }

  get pagosFiltrados(): Pago[] {
    const txt = this.filtro.toLowerCase().trim();

    return txt
      ? this.listaPagos.filter(p =>
          p.cliente.toLowerCase().includes(txt) ||
          p.metodo.toLowerCase().includes(txt) ||
          (p.tipoTarjeta?.toLowerCase().includes(txt) ?? false)
        )
      : this.listaPagos;
  }

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

  eliminarPago(id: number): void {
    this.listaPagos = this.listaPagos.filter(p => p.id !== id);
    this.actualizarEstadisticas();
  }

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

    // TARJETA
    this.tipoTarjeta = '';
    this.numTarjeta = '';
    this.cvv = '';

    // TRANSFERENCIA
    this.numOperacion = '';
    this.banco = '';
  }
}
