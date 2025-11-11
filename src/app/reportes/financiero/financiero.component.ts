import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financiero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-8">
      <h1 class="text-3xl font-bold text-gray-800">Reportes Financieros</h1>
      <p class="text-gray-500">Análisis detallado de ingresos y gastos</p>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-lg border border-green-100">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-gray-600">Ingresos Totales</p>
            <span class="text-2xl text-green-500">$</span>
          </div>
          <p class="text-3xl font-extrabold text-gray-900 mt-2">$132,400</p>
          <div class="flex items-center text-sm mt-1">
            <span class="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +12.9%
            </span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg border border-red-100">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-gray-600">Gastos Totales</p>
            <span class="text-2xl text-red-500">$</span>
          </div>
          <p class="text-3xl font-extrabold text-gray-900 mt-2">$46,000</p>
          <div class="flex items-center text-sm mt-1">
            <span class="text-red-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              +8.1%
            </span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-gray-600">Ganancia Neta</p>
            <span class="text-2xl text-indigo-500">$</span>
          </div>
          <p class="text-3xl font-extrabold text-gray-900 mt-2">$86,400</p>
          <div class="flex items-center text-sm mt-1">
            <span class="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +15.2%
            </span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg border border-pink-100">
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-gray-600">Margen de Ganancia</p>
            <span class="text-2xl text-pink-500">%</span>
          </div>
          <p class="text-3xl font-extrabold text-gray-900 mt-2">65.2%</p>
          <div class="flex items-center text-sm mt-1 text-blue-500">
            Muy saludable
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.204A9.958 9.958 0 0112 21.78c-3.92 0-7.258-2.585-8.74-6.195m2.07-4.26a10.01 10.01 0 0112.56-1.503"></path></svg>
          </div>
        </div>
      </div>

      <div class="flex border-b border-gray-200 mt-8 space-x-4">
        <button class="pb-2 px-4 border-b-2 border-indigo-600 text-indigo-600 font-medium">Resumen General</button>
        <button class="pb-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition">Transacciones</button>
        <button class="pb-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition">Desglose</button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Ingresos vs Gastos Mensuales</h3>
          <p class="text-sm text-gray-500 mb-6">Comparativa mensual del año 2025</p>
          
          <div class="h-80 w-full flex items-end border-l border-b border-gray-300 relative px-2">
            
            <div class="absolute w-full h-full left-0 top-0 text-sm text-gray-500">
                <div class="absolute top-0 -left-10">16000</div>
                <div class="absolute top-1/4 -left-10">12000</div>
                <div class="absolute top-1/2 -left-10">8000</div>
                <div class="absolute top-3/4 -left-10">4000</div>
            </div>

            <div class="flex space-x-2 w-full ml-10">
                <div *ngFor="let month of monthlyData()" class="flex flex-col justify-end items-center h-full w-1/12">
                    <div [style.height.px]="month.neto * 0.005" class="w-2/3 bg-green-500 rounded-t-sm transition-all duration-300"></div>
                    <div [style.height.px]="month.ingresos * 0.005" class="w-2/3 bg-blue-500 rounded-t-sm transition-all duration-300"></div>
                    <div [style.height.px]="month.gastos * 0.005" class="w-2/3 bg-red-500 rounded-t-sm transition-all duration-300"></div>
                    <span class="text-xs text-gray-500 mt-1">{{ month.label }}</span>
                </div>
            </div>
          </div>
          
          <div class="flex justify-center space-x-6 mt-4 text-sm">
            <span class="flex items-center text-red-500">
              <span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Gastos
            </span>
            <span class="flex items-center text-blue-500">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Ingresos
            </span>
            <span class="flex items-center text-green-500">
              <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Neto
            </span>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-8">
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Distribución de Gastos</h3>
                <p class="text-sm text-gray-500 mb-6">Por categoría</p>
                <div class="flex items-center space-x-6">
                    <svg viewBox="0 0 100 100" class="w-32 h-32">
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#3B82F6" stroke-width="10" stroke-dasharray="35 65" stroke-dashoffset="0" />
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#10B981" stroke-width="10" stroke-dasharray="24 76" stroke-dashoffset="-35" />
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#F59E0B" stroke-width="10" stroke-dasharray="29 71" stroke-dashoffset="-59" />
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#8B5CF6" stroke-width="10" stroke-dasharray="12 88" stroke-dashoffset="-88" />
                    </svg>
                    
                    <div class="text-sm space-y-2">
                        <p class="text-blue-500">Mantenimiento <span class="font-bold">35%</span></p>
                        <p class="text-green-500">Servicios <span class="font-bold">24%</span></p>
                        <p class="text-yellow-500">Impuestos <span class="font-bold">29%</span></p>
                        <p class="text-purple-500">Seguros <span class="font-bold">12%</span></p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Ingresos por Propiedad</h3>
                <p class="text-sm text-gray-500 mb-4">Contribución mensual</p>
                
                <div class="space-y-3">
                    <div *ngFor="let ingreso of ingresosPorPropiedad()" class="flex justify-between items-center text-sm">
                        <div>
                            <p class="text-gray-700">{{ ingreso.nombre }}</p>
                            <div class="h-1 bg-gray-200 rounded-full mt-1">
                                <div class="h-1 bg-blue-500 rounded-full" [style.width.%]="ingreso.porcentaje"></div>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-800">{{ ingreso.monto | currency:'USD':'symbol':'1.0-0' }}</p>
                            <p class="text-xs text-gray-400">{{ ingreso.porcentaje }}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class FinancieroComponent {
  monthlyData = signal([
    { label: 'Ene', gastos: 4000, ingresos: 8000, neto: 4000 },
    { label: 'Feb', gastos: 4500, ingresos: 9000, neto: 4500 },
    { label: 'Mar', gastos: 3800, ingresos: 7500, neto: 3700 },
    { label: 'Abr', gastos: 4100, ingresos: 8500, neto: 4400 },
    { label: 'May', gastos: 4300, ingresos: 9200, neto: 4900 },
    { label: 'Jun', gastos: 4500, ingresos: 9500, neto: 5000 },
    { label: 'Jul', gastos: 4200, ingresos: 8800, neto: 4600 },
    { label: 'Ago', gastos: 4800, ingresos: 10000, neto: 5200 },
    { label: 'Sep', gastos: 4500, ingresos: 9800, neto: 5300 },
    { label: 'Oct', gastos: 4600, ingresos: 10200, neto: 5600 },
  ]);

  ingresosPorPropiedad = signal([
    { nombre: 'Local Comercial Plaza', monto: 2200, porcentaje: 18 },
    { nombre: 'Casa Residencial Norte', monto: 1800, porcentaje: 15 },
    { nombre: 'Departamento Vista Mar', monto: 1500, porcentaje: 12 },
    { nombre: 'Apartamento Centro 101', monto: 1200, porcentaje: 10 },
    { nombre: 'Estudio Universitario', monto: 850, porcentaje: 7 },
    { nombre: 'Otros (13 propiedades)', monto: 4500, porcentaje: 38 },
  ]);
}