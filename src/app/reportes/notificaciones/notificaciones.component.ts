import { Component, signal, computed, Input, Output, EventEmitter, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common'; 

type TipoNotificacion = "pago_recibido" | "pago_atrasado" | "mantenimiento" | "contrato_proximo";
interface Notificacion {
  id: number;
  tipo: TipoNotificacion;
  titulo: string;
  mensaje: string;
  propiedad: string;
  fecha: Date;
  leida: boolean;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <div class="max-w-4xl mx-auto md:mx-0">
      <h3 class="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Centro de Notificaciones ({{ notificaciones().length }})
      </h3>
      
      <div class="flex justify-end mb-4">
        <button (click)="markAllAsRead()" class="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
          Marcar todos como leídos
        </button>
      </div>

      <div class="space-y-4">
        @if (notificaciones().length === 0) {
          <div class="text-center py-10 text-gray-500 italic bg-white rounded-xl shadow-lg">
            No hay notificaciones pendientes. ¡Todo en orden!
          </div>
        } @else {
          @for (notif of notificaciones(); track notif.id) {
            <div 
              class="p-4 rounded-xl shadow-lg transition duration-300 ease-in-out flex flex-col md:flex-row justify-between items-start md:items-center transform hover:shadow-xl relative cursor-pointer"
              [class]="[getNotifStyle(notif.tipo), notif.leida ? 'opacity-70 hover:opacity-100' : 'opacity-100 ring-2 ring-blue-500/50']">
              
              @if (!notif.leida) {
                <span class="absolute top-0 right-0 -mt-2 -mr-2 h-3 w-3 rounded-full bg-red-500 animate-pulse z-10" aria-label="Notificación no leída"></span>
              }

              <div class="flex-grow flex flex-col space-y-1 mb-3 md:mb-0">
                <div class="flex items-center space-x-3">
                  <div [innerHTML]="getIconForType(notif.tipo)" class="w-6 h-6 flex-shrink-0" [class]="getPriorityColorClass(notif.prioridad, 'text')"></div>
                  
                  <span class="font-bold text-lg text-gray-800">{{ notif.titulo }}</span>
                  <span [class]="getPriorityColorClass(notif.prioridad, 'bg')" class="text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase ml-auto">
                    {{ notif.prioridad }}
                  </span>
                </div>
                
                <p class="text-base text-gray-700 ml-9">{{ notif.mensaje }}</p>
                <p class="text-xs mt-1 italic text-gray-500 ml-9">Propiedad: {{ notif.propiedad }}</p>
              </div>
              <div class="flex-shrink-0 flex flex-col items-start md:items-end space-y-2 pt-3 md:pt-0 border-t md:border-t-0 md:border-l md:pl-4">
                <span class="text-sm text-gray-500 whitespace-nowrap">
                  {{ formatFecha(notif.fecha) }}
                </span>
                
                <div class="flex space-x-2 mt-2">
                  <button 
                    (click)="toggleReadStatus(notif.id)"
                    class="px-3 py-1 text-xs font-medium rounded-full transition duration-150 transform hover:scale-105 shadow-sm"
                    [ngClass]="{
                      'bg-blue-500 text-white hover:bg-blue-600': !notif.leida,
                      'bg-gray-300 text-gray-700 hover:bg-gray-400': notif.leida
                    }"
                  >
                    {{ notif.leida ? 'Leída' : 'Marcar Leída' }}
                  </button>

                  <button 
                    (click)="deleteNotification(notif.id)"
                    class="px-3 py-1 text-xs font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-150 transform hover:scale-105 shadow-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .card-pago_recibido { background-color: #e8f5e9; border-left: 5px solid #4caf50; }
    .card-pago_atrasado { background-color: #ffebee; border-left: 5px solid #f44336; }
    .card-mantenimiento { background-color: #fff8e1; border-left: 5px solid #ff9800; }
    .card-contrato_proximo { background-color: #e3f2fd; border-left: 5px solid #2196f3; }
  `]
})
export class NotificacionesComponent {
  notificaciones = signal<Notificacion[]>([
    { id: 1, tipo: "pago_recibido", titulo: "Pago de Alquiler Recibido", mensaje: "El inquilino 'Juan Pérez' ha realizado el pago de noviembre. ¡Felicidades!", propiedad: "Departamento 101, Calle Falsa 123", fecha: new Date(Date.now() - 86400000), leida: false, prioridad: "Alta" },
    { id: 2, tipo: "pago_atrasado", titulo: "⚠️ Pago Atrasado - Urgente", mensaje: "El pago de diciembre de la propiedad 'Casa Grande' está pendiente por 5 días.", propiedad: "Casa Grande, Avenida Siempre Viva", fecha: new Date(Date.now() - 2 * 86400000), leida: false, prioridad: "Alta" },
    { id: 3, tipo: "mantenimiento", titulo: "Nueva Solicitud de Mantenimiento", mensaje: "Se necesita reparar una gotera en el baño de la propiedad 302. El inquilino adjuntó fotos.", propiedad: "Oficina 302, Edificio Central", fecha: new Date(Date.now() - 3 * 86400000), leida: true, prioridad: "Media" },
    { id: 4, tipo: "contrato_proximo", titulo: "Contrato Próximo a Vencer", mensaje: "El contrato de arrendamiento de la Propiedad Z vence en 30 días. ¡Revisar renovación!", propiedad: "Propiedad Z, Bulevar del Sol", fecha: new Date(Date.now() - 5 * 86400000), leida: true, prioridad: "Baja" }
  ]);
  
  toggleReadStatus(id: number): void {
    this.notificaciones.update(notifs =>
      notifs.map(notif =>
        notif.id === id ? { ...notif, leida: !notif.leida } : notif
      )
    );
  }

  deleteNotification(id: number): void {
    this.notificaciones.update(notifs =>
      notifs.filter(notif => notif.id !== id)
    );
  }
  
  markAllAsRead(): void {
    this.notificaciones.update(notifs =>
      notifs.map(notif => ({ ...notif, leida: true }))
    );
  }

  getNotifStyle(tipo: TipoNotificacion): string { return `card-${tipo}`; }

  getPriorityColorClass(prioridad: Notificacion['prioridad'], type: 'bg' | 'text'): string {
    if (type === 'text') {
        if (prioridad === 'Alta') return 'text-red-500';
        if (prioridad === 'Media') return 'text-amber-500';
        return 'text-green-500';
    } else { 
        if (prioridad === 'Alta') return 'bg-red-500 text-white';
        if (prioridad === 'Media') return 'bg-amber-100 text-amber-800';
        return 'bg-green-100 text-green-800';
    }
  }

  formatFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  getIconForType(tipo: TipoNotificacion): string {
    switch (tipo) {
      case 'pago_recibido': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
      case 'pago_atrasado': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      case 'mantenimiento': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.35a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.27a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.78 1.35a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 1-1.73v-.18a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.35a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.27a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.78-1.35a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-1-1.73v-.18a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
      case 'contrato_proximo': return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/></svg>`;
      default: return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`;
    }
  }
}