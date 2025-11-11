import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="flex h-full bg-gray-50">
      <aside class="w-64 bg-white p-6 shadow-xl border-r border-gray-200">
        <nav class="space-y-2">

          <a [routerLink]="['/reportes/dashboard']" 
             routerLinkActive="bg-indigo-100 text-indigo-700 font-semibold"
             class="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
            Dashboard
          </a>

          <a [routerLink]="['/reportes/notificaciones']" 
             routerLinkActive="bg-indigo-100 text-indigo-700 font-semibold"
             class="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
            Notificaciones
          </a>

          <a [routerLink]="['/reportes/configuracion']" 
             routerLinkActive="bg-indigo-100 text-indigo-700 font-semibold"
             class="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
            Configuración
          </a>

          <a [routerLink]="['/reportes/financiero']" 
             routerLinkActive="bg-indigo-100 text-indigo-700 font-semibold"
             class="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
            Financiero
          </a>

          <a [routerLink]="['/reportes/inquilinos']" 
             routerLinkActive="bg-indigo-100 text-indigo-700 font-semibold"
             class="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
            Inquilinos
          </a>

        </nav>
      </aside>

      <main class="flex-grow p-8 overflow-y-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class ReportesComponent {
}
