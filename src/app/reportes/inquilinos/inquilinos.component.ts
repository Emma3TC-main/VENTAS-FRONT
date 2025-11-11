import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-inquilinos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="p-6 space-y-8 bg-gray-50">
      <h1 class="text-3xl font-bold text-gray-800">Reportes de Inquilinos</h1>
      <p class="text-gray-500">Información y análisis de tus inquilinos</p>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-1">
          <p class="text-sm font-semibold text-gray-600">Total Inquilinos</p>
          <div class="flex items-center justify-between mt-2">
            <p class="text-3xl font-extrabold text-gray-900">{{ metrics.totalInquilinos }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-1">
          <p class="text-sm font-semibold text-gray-600">Tasa de Pago a Tiempo</p>
          <div class="flex items-center justify-between mt-2">
            <p class="text-3xl font-extrabold text-gray-900">{{ metrics.tasaPago }}%</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M9 11l3 3L22 4"/></svg>
          </div>
          <p class="text-xs text-green-500">...Excelente</p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-1">
          <p class="text-sm font-semibold text-gray-600">Pagos Atrasados</p>
          <div class="flex items-center justify-between mt-2">
            <p class="text-3xl font-extrabold text-gray-900">{{ metrics.pagosAtrasados }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <p class="text-xs text-red-500">Requiere seguimiento</p>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex-1">
          <p class="text-sm font-semibold text-gray-600">Renta Total Mensual</p>
          <div class="flex items-center justify-between mt-2">
            <p class="text-3xl font-extrabold text-gray-900 text-pink-500">{{ metrics.rentaTotal | currency:'USD':'symbol':'1.0-0' }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <p class="text-xs text-gray-500">De inquilinos activos</p>
        </div>
        
        <div class="flex flex-col justify-center items-center">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Exportar
            </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Historial de Pagos</h3>
          <p class="text-sm text-gray-500 mb-6">Pagos a tiempo vs atrasados por mes</p>
          
          <div class="h-64 w-full flex items-end border-l border-b border-gray-300 relative px-2">
            <div class="absolute w-full h-full left-0 top-0 text-sm text-gray-500">
                <div class="absolute top-0 -left-6">20+</div>
                <div class="absolute top-1/4 -left-6">15+</div>
                <div class="absolute top-1/2 -left-6">10+</div>
                <div class="absolute top-3/4 -left-6">5+</div>
            </div>

            <div class="flex space-x-2 w-full ml-6">
                <div *ngFor="let month of paymentHistory()" class="flex flex-col justify-end items-center h-full w-1/12">
                    <div [style.height.px]="month.late * 10" class="w-3/4 bg-red-500 rounded-t-sm"></div>
                    <div [style.height.px]="month.onTime * 10" class="w-3/4 bg-green-500 rounded-t-sm"></div>
                    <span class="text-xs text-gray-500 mt-1">{{ month.label }}</span>
                </div>
            </div>
          </div>
          
          <div class="flex justify-center space-x-6 mt-4 text-sm">
            <span class="flex items-center text-green-500">
              <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>A Tiempo
            </span>
            <span class="flex items-center text-red-500">
              <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Atrasado
            </span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Retención de Inquilinos</h3>
          <p class="text-sm text-gray-500 mb-6">Distribución por tiempo de permanencia</p>
          
          <div class="space-y-4">
            <div *ngFor="let retencion of retentionData()" class="flex items-center">
              <span class="text-sm text-gray-600 w-24">{{ retencion.label }}</span>
              <div class="flex-grow bg-gray-200 rounded-full h-4 relative ml-4">
                <div [style.width.%]="retencion.count * 10" class="bg-blue-500 h-4 rounded-full transition-all duration-500"></div>
              </div>
              <span class="text-sm text-gray-500 ml-2">{{ retencion.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg mt-8">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Directorio de Inquilinos</h3>
        <p class="text-sm text-gray-500 mb-6">Información detallada de cada inquilino</p>

        <div class="flex border-b border-gray-200 mb-4 space-x-4">
            <button class="pb-2 px-4 border-b-2 border-indigo-600 text-indigo-600 font-medium text-sm">Todos</button>
            <button class="pb-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition text-sm">Al día</button>
            <button class="pb-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition text-sm">Atrasados</button>
            
            <div class="flex-grow"></div>
             <div class="relative">
                <input type="text" placeholder="Buscar inquilino..." class="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 pl-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th class="py-3 px-2"></th>
                <th class="py-3 px-2">Inquilino</th>
                <th class="py-3 px-2">Propiedad</th>
                <th class="py-3 px-2">Renta Mensual</th>
                <th class="py-3 px-2">Estado</th>
                <th class="py-3 px-2">Último Pago</th>
                <th class="py-3 px-2">Total Pagado</th>
                <th class="py-3 px-2">Contrato</th>
                <th class="py-3 px-2">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 text-sm">
              <tr *ngFor="let tenant of tenantsData()" class="hover:bg-gray-50 transition">
                <td class="py-3 px-2">
                    <span class="inline-flex items-center justify-center h-8 w-8 rounded-full text-white font-medium" 
                          [ngStyle]="{'background-color': getAvatarColor(tenant.name)}">
                        {{ tenant.initials }}
                    </span>
                </td>
                <td class="py-3 px-2">
                  <p class="font-medium text-gray-900">{{ tenant.name }}</p>
                  <p class="text-xs text-gray-500">{{ tenant.email }}</p>
                </td>
                <td class="py-3 px-2">{{ tenant.property }}</td>
                <td class="py-3 px-2">{{ tenant.rent | currency:'USD':'symbol':'1.0-0' }}</td>
                <td class="py-3 px-2">
                    <span *ngIf="tenant.status === 'Al día'" class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {{ tenant.status }}
                    </span>
                    <span *ngIf="tenant.status === 'Atrasado'" class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {{ tenant.status }} <br> 5 días atrasado
                    </span>
                    <span *ngIf="tenant.status === 'Pendiente'" class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {{ tenant.status }}
                    </span>
                </td>
                <td class="py-3 px-2">{{ tenant.lastPayment }}</td>
                <td class="py-3 px-2">{{ tenant.totalPaid | currency:'USD':'symbol':'1.0-0' }}</td>
                <td class="py-3 px-2 text-gray-600">{{ tenant.contract }}</td>
                <td class="py-3 px-2">
                  <button title="Editar" class="text-blue-500 hover:text-blue-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class InquilinosComponent {
  metrics = {
    totalInquilinos: 22,
    tasaPago: 80.0,
    pagosAtrasados: 4,
    rentaTotal: 7550,
  };

  paymentHistory = signal([
    { label: 'Abr', onTime: 16, late: 2 },
    { label: 'May', onTime: 17, late: 1 },
    { label: 'Jun', onTime: 17, late: 1 },
    { label: 'Jul', onTime: 16, late: 2 },
    { label: 'Ago', onTime: 18, late: 0 },
    { label: 'Sep', onTime: 16, late: 2 },
    { label: 'Oct', onTime: 15, late: 3 },
  ]);

  retentionData = signal([
    { label: '0-6 meses', count: 3 },
    { label: '6-12 meses', count: 5 },
    { label: '1-2 años', count: 7 },
    { label: '2+ años', count: 8 },
  ]);

  tenantsData = signal([
    { initials: 'JP', name: 'Juan Pérez', email: 'juan.perez@email.com', property: 'Apartamento Centro 101', rent: 1200, status: 'Al día', lastPayment: '13/10/2025', totalPaid: 12000, contract: 'ene 2024 - ene 2025' },
    { initials: 'MG', name: 'María González', email: 'maria.gonzalez@email.com', property: 'Casa Residencial Norte', rent: 1800, status: 'Atrasado', lastPayment: '4/9/2025', totalPaid: 25200, contract: 'may 2023 - may 2025' },
    { initials: 'AT', name: 'Ana Torres', email: 'ana.torres@email.com', property: 'Estudio Universitario', rent: 850, status: 'Al día', lastPayment: '12/10/2025', totalPaid: 2550, contract: 'jul 2024 - jul 2025' },
    { initials: 'CR', name: 'Carlos Ramírez', email: 'carlos.ramirez@email.com', property: 'Local Comercial Plaza', rent: 2200, status: 'Al día', lastPayment: '10/10/2025', totalPaid: 61600, contract: 'feb 2022 - nov 2025' },
    { initials: 'LM', name: 'Luis Martínez', email: 'luis.martinez@email.com', property: 'Departamento Vista Mar', rent: 1500, status: 'Al día', lastPayment: '4/10/2025', totalPaid: 16500, contract: 'nov 2023 - nov 2025' },
    { initials: 'RS', name: 'Roberto Silva', email: 'roberto.silva@email.com', property: 'Apartamento Moderno', rent: 1100, status: 'Pendiente', lastPayment: '—', totalPaid: 0, contract: 'oct 2025 - oct 2026' },
  ]);

  getAvatarColor(name: string): string {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    return colors[hash % colors.length];
  }
}