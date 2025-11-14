import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Contrato {
  id: number;
  cliente: string;
  fecha: string;
  monto: number;
  estado: string;
  descripcion: string;
}

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contratos.component.html'
})
export class ContratosComponent {

  // Lista de contratos
  contratos = signal<Contrato[]>([
    {
      id: 1,
      cliente: 'Juan Pérez',
      fecha: '2025-11-12',
      monto: 1200,
      estado: 'Activo',
      descripcion: 'Contrato por servicios de mantenimiento.'
    },
    {
      id: 2,
      cliente: 'María López',
      fecha: '2025-11-10',
      monto: 850,
      estado: 'Pendiente',
      descripcion: 'Contrato por asesorías administrativas.'
    }
  ]);

  // Campos para crear contratos
  nuevoContrato = signal<Contrato>({
    id: 0,
    cliente: '',
    fecha: '',
    monto: 0,
    estado: 'Pendiente',
    descripcion: ''
  });

  // Filtro
  filtroTexto = signal('');

  // Computados
  activos = computed(() =>
    this.contratos().filter(c => c.estado === 'Activo').length
  );

  pendientes = computed(() =>
    this.contratos().filter(c => c.estado === 'Pendiente').length
  );

  contratosFiltrados = computed(() => {
    const filtro = this.filtroTexto().toLowerCase();
    return this.contratos().filter(c =>
      c.cliente.toLowerCase().includes(filtro) ||
      c.estado.toLowerCase().includes(filtro)
    );
  });

  // Modal
  modalAbierto = signal(false);
  contratoSeleccionado = signal<Contrato | null>(null);

  abrirModal(c: Contrato) {
    this.contratoSeleccionado.set(c);
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.contratoSeleccionado.set(null);
  }

  // Agregar contrato
  agregarContrato() {

    const lista = this.contratos();
    const nuevo = { ...this.nuevoContrato(), id: lista.length + 1 };

    this.contratos.set([...lista, nuevo]);

    this.nuevoContrato.set({
      id: 0,
      cliente: '',
      fecha: '',
      monto: 0,
      estado: 'Pendiente',
      descripcion: ''
    });
  }
}
