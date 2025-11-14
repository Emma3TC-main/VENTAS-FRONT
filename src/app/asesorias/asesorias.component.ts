import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Asesoria {
  id: number;
  cliente: string;
  tema: string;
  fecha: string;
  estado: string;
  monto: number;
  descripcion: string;
}

@Component({
  selector: 'app-asesorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})
export class AsesoriasComponent {

  // Datos iniciales (mock)
  asesorias = signal<Asesoria[]>([
    {
      id: 1,
      cliente: 'Carlos Muñoz',
      tema: 'Gestión de inventario',
      fecha: '2025-11-12',
      estado: 'Completada',
      monto: 450,
      descripcion: 'Optimización del flujo de inventario.'
    },
    {
      id: 2,
      cliente: 'Fernanda Torres',
      tema: 'Marketing digital',
      fecha: '2025-11-10',
      estado: 'Pendiente',
      monto: 300,
      descripcion: 'Asesoría en campañas de redes sociales.'
    }
  ]);

  // Modal
  modalAbierto = signal(false);
  asesoriaSeleccionada = signal<Asesoria | null>(null);

  abrirModal(a: Asesoria) {
    this.asesoriaSeleccionada.set(a);
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.asesoriaSeleccionada.set(null);
  }

  // Nueva asesoría
  nuevaAsesoria: Omit<Asesoria, 'id'> = {
    cliente: '',
    tema: '',
    fecha: '',
    estado: 'Pendiente',
    monto: 0,
    descripcion: ''
  };

  agregarAsesoria() {
    const lista = this.asesorias();
    const nueva: Asesoria = {
      id: lista.length + 1,
      ...this.nuevaAsesoria
    };

    this.asesorias.set([...lista, nueva]);

    // Reset form
    this.nuevaAsesoria = {
      cliente: '',
      tema: '',
      fecha: '',
      estado: 'Pendiente',
      monto: 0,
      descripcion: ''
    };
  }

  // Buscador
  filtro = signal('');

  asesoriasFiltradas = computed(() => {
    const f = this.filtro().toLowerCase();
    return this.asesorias().filter(a =>
      a.cliente.toLowerCase().includes(f) ||
      a.tema.toLowerCase().includes(f) ||
      a.estado.toLowerCase().includes(f)
    );
  });

}
