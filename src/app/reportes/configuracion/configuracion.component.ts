import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [],
  template: `
    <div class="p-4 md:p-8 bg-white rounded-xl shadow-lg">
      <h3 class="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
        Configuración de Notificaciones
      </h3>
      <p class="text-gray-600 mb-8">
        Ajusta cómo y cuándo deseas recibir alertas sobre la gestión de propiedades.
      </p>

      <div class="space-y-8">
        
        <section class="border-b pb-6">
          <h4 class="text-xl font-semibold text-blue-600 mb-4">Configuración General</h4>
          <p class="text-sm text-gray-500 mb-4">Activa o desactiva canales de notificación.</p>

          <div class="flex flex-col space-y-4">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <label for="notif-push" class="font-medium text-gray-700">Notificaciones Push</label>
              <input type="checkbox" id="notif-push" class="toggle toggle-primary" [checked]="pushEnabled()" (change)="togglePush()"/>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <label for="notif-sms" class="font-medium text-gray-700">Notificaciones SMS</label>
              <input type="checkbox" id="notif-sms" class="toggle toggle-primary" [checked]="smsEnabled()" (change)="toggleSms()"/>
            </div>
          </div>
        </section>

        <section class="border-b pb-6">
          <h4 class="text-xl font-semibold text-blue-600 mb-4">Horario de Silencio</h4>
          <p class="text-sm text-gray-500 mb-4">Silencia las notificaciones durante estas horas.</p>
          <div class="flex gap-4 items-center">
            <label class="text-gray-700">Inicio:</label>
            <input type="time" class="input input-bordered w-32" [value]="startTime()" (change)="startTime.set($event.target.value)">
            <label class="text-gray-700">Fin:</label>
            <input type="time" class="input input-bordered w-32" [value]="endTime()" (change)="endTime.set($event.target.value)">
          </div>
        </section>

        <section>
          <h4 class="text-xl font-semibold text-blue-600 mb-4">Plantillas de Notificación</h4>
          <p class="text-sm text-gray-500 mb-4">Gestione las plantillas de mensajes automáticos.</p>

          <ul class="space-y-3">
            <li class="flex justify-between items-center p-3 border rounded-lg hover:bg-yellow-50/50 transition-colors">
              <span class="font-medium text-gray-700">Confirmación de Pago</span>
              <button class="text-blue-500 hover:text-blue-700 font-semibold text-sm">Editar</button>
            </li>
            <li class="flex justify-between items-center p-3 border rounded-lg hover:bg-yellow-50/50 transition-colors">
              <span class="font-medium text-gray-700">Recordatorio de Renta</span>
              <button class="text-blue-500 hover:text-blue-700 font-semibold text-sm">Editar</button>
            </li>
            <li class="flex justify-between items-center p-3 border rounded-lg hover:bg-yellow-50/50 transition-colors">
              <span class="font-medium text-gray-700">Solicitud de Mantenimiento</span>
              <button class="text-blue-500 hover:text-blue-700 font-semibold text-sm">Editar</button>
            </li>
          </ul>
        </section>

      </div>

      <div class="mt-10 pt-6 border-t flex justify-end">
        <button class="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg px-8 py-3 rounded-xl transition-all" (click)="guardarConfiguracion()">
          Guardar Configuración
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toggle {
        @apply appearance-none w-14 h-8 bg-gray-300 rounded-full relative cursor-pointer;
        transition: background-color 0.3s ease;
    }
    .toggle:checked {
        @apply bg-blue-500;
    }
    .toggle:before {
        content: '';
        @apply absolute w-6 h-6 bg-white rounded-full transition-transform;
        top: 4px;
        left: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .toggle:checked:before {
        transform: translateX(100%);
    }
  `]
})
export class ConfiguracionComponent {
  pushEnabled = signal(true);
  smsEnabled = signal(false);
  startTime = signal('08:00');
  endTime = signal('22:00');

  constructor() {}

  togglePush() {
    this.pushEnabled.update(value => !value);
    console.log(`Push notifications: ${this.pushEnabled() ? 'Activadas' : 'Desactivadas'}`);
  }

  toggleSms() {
    this.smsEnabled.update(value => !value);
    console.log(`SMS notifications: ${this.smsEnabled() ? 'Activadas' : 'Desactivadas'}`);
  }

  guardarConfiguracion() {
    console.log('Configuración guardada:', {
      push: this.pushEnabled(),
      sms: this.smsEnabled(),
      horario: `${this.startTime()} - ${this.endTime()}`
    });
  }
}