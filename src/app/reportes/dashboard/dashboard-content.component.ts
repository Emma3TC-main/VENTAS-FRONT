import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h3 class="text-3xl font-bold text-gray-800 mb-6">Vista Rápida del Mes</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-white p-5 rounded-xl shadow-lg border-l-4 border-blue-500 transition hover:shadow-xl">
          <p class="text-sm font-medium text-gray-500 uppercase">Ingresos Totales</p>
          <p class="text-3xl font-extrabold text-gray-900 mt-1">$15,200</p>
          <span class="text-xs text-green-600 flex items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 17 12 5"/><line x1="18" y1="11" x2="12" y2="5"/><line x1="6" y1="11" x2="12" y2="5"/></svg>
            +4.5% vs Mes pasado
          </span>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-lg border-l-4 border-yellow-500 transition hover:shadow-xl">
          <p class="text-sm font-medium text-gray-500 uppercase">Pagos Pendientes</p>
          <p class="text-3xl font-extrabold text-gray-900 mt-1">2</p>
          <span class="text-xs text-red-600 flex items-center mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 7 12 19"/><line x1="18" y1="13" x2="12" y2="19"/><line x1="6" y1="13" x2="12" y2="19"/></svg>
            $1,800.00
          </span>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-lg border-l-4 border-red-500 transition hover:shadow-xl">
          <p class="text-sm font-medium text-gray-500 uppercase">Contratos por Vencer</p>
          <p class="text-3xl font-extrabold text-gray-900 mt-1">3</p>
          <span class="text-xs text-gray-600 mt-2">
            Próximos 30 días
          </span>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-lg border-l-4 border-green-500 transition hover:shadow-xl">
          <p class="text-sm font-medium text-gray-500 uppercase">Tasa de Ocupación</p>
          <p class="text-3xl font-extrabold text-gray-900 mt-1">98%</p>
          <span class="text-xs text-blue-600 mt-2">
            20/20 Propiedades
          </span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Rendimiento de Ingresos Anual</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 italic">
            [Espacio para Gráfico de Líneas]
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Alertas Pendientes</h3>
          <ul class="space-y-3">
            <li class="flex items-center justify-between p-2 rounded-lg bg-red-50 border border-red-200">
              <span class="text-sm font-medium text-red-700">Pago de Propiedad Atrasado</span>
              <span class="text-xs text-red-500">Urgente</span>
            </li>
            <li class="flex items-center justify-between p-2 rounded-lg bg-yellow-50 border border-yellow-200">
              <span class="text-sm font-medium text-yellow-700">Inspección de Unidad 301</span>
              <span class="text-xs text-yellow-500">Próximo</span>
            </li>
            <li class="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-200">
              <span class="text-sm font-medium text-blue-700">Renovación de Licencia</span>
              <span class="text-xs text-blue-500">30 Días</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class DashboardContentComponent {}