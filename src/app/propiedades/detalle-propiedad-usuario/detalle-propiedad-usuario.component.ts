import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface PropiedadDetalle {
  id: string;
  nombre: string;
  direccion: string;
  rentaMes: number;
  estado: 'Alquiler' | 'Venta' | 'Ocupada' | 'Mantenimiento'; 
  imagenesUrl: string[]; 
  descripcion: string;
}

@Component({
  selector: 'app-detalle-propiedad-usuario',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="min-h-screen bg-white">
      <div class="container mx-auto px-4 py-12 max-w-4xl">
        
        <div *ngIf="propiedad; else loading" class="bg-gray-50 p-6 rounded-xl shadow-2xl">
          
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
            <div>
              <h1 class="text-4xl font-extrabold text-blue-800">{{ propiedad.nombre }}</h1>
              <p class="text-xl text-gray-600 mt-1">{{ propiedad.direccion }}</p>
            </div>
            <p class="text-3xl font-bold text-green-600 bg-green-50 p-3 rounded-xl shadow-inner mt-4 md:mt-0">
              {{ propiedad.rentaMes | currency: 'USD' }}
              <span class="text-sm font-normal text-gray-500 block">
                / {{ propiedad.estado === 'Venta' ? 'Venta' : 'Mes' }}
              </span>
            </p>
          </div>

          <div class="relative mb-8 shadow-xl rounded-lg overflow-hidden">
            <img [src]="propiedad.imagenesUrl[indiceActual]" [alt]="propiedad.nombre + ' - ' + (indiceActual + 1)" 
                 class="w-full h-96 object-cover transition-opacity duration-500"
                 onerror="this.onerror=null;this.src='https://placehold.co/800x400/374151/ffffff?text=FOTO+NO+DISPONIBLE'"
            >
            
            <button (click)="cambiarImagen(-1)" 
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition z-10 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button (click)="cambiarImagen(1)" 
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition z-10 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <span *ngFor="let img of propiedad.imagenesUrl; let i = index"
                    [class.bg-white]="i === indiceActual"
                    [class.bg-white/50]="i !== indiceActual"
                    class="block w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 border border-black/20"
                    (click)="seleccionarImagen(i)">
              </span>
            </div>
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-700 border-l-4 border-blue-500 pl-3">Detalles y Características</h2>
            <p class="text-gray-700 leading-relaxed">{{ propiedad.descripcion }}</p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                <button *ngIf="propiedad.estado === 'Alquiler'" 
                        (click)="mostrarAdvertencia('Alquilar')"
                        class="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-indigo-700 transition duration-300 shadow-xl shadow-indigo-200">
                    ALQUILAR ESTA PROPIEDAD
                </button>

                <button *ngIf="propiedad.estado === 'Venta'" 
                        (click)="mostrarAdvertencia('Comprar')"
                        class="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-700 transition duration-300 shadow-xl shadow-green-200">
                    COMPRAR ESTA PROPIEDAD
                </button>
                
                <button (click)="mostrarAdvertencia('Contactar')"
                        class="w-full sm:w-1/2 bg-gray-200 text-gray-800 font-bold py-4 rounded-xl text-lg hover:bg-gray-300 transition duration-300 shadow-lg">
                    Contactar a un Asesor
                </button>
            </div>
            
            <div *ngIf="advertenciaMensaje" class="mt-4 p-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-lg shadow-inner">
              {{ advertenciaMensaje }}
            </div>

          </div>

        </div>

        <ng-template #loading>
          <div class="text-center text-xl text-gray-500 p-20">Cargando detalles de la propiedad...</div>
        </ng-template>

      </div>
    </div>
  `,
  styles: [`
  `]
})
export class DetallePropiedadVistaUsuarioComponent implements OnInit {
  
  propiedad: PropiedadDetalle | undefined;
  indiceActual: number = 0;
  advertenciaMensaje: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cargarDetalleEjemplo(id);
    }
  }

  cargarDetalleEjemplo(id: string): void {
    interface MockPropiedad {
      nombre: string;
      direccion: string;
      rentaMes: number;
      estado: 'Alquiler' | 'Venta' | 'Ocupada' | 'Mantenimiento';
      imagenesUrl: string[];
      descripcion: string;
    }

    const mockData: { [key: string]: MockPropiedad } = {
      '1': {
        nombre: 'Acogedor Apartamento en el Centro',
        direccion: 'Calle Falsa 123, Miraflores',
        rentaMes: 850,
        estado: 'Alquiler',
        imagenesUrl: [
          'https://placehold.co/800x400/0F766E/ffffff?text=Apto+1%2FPrincipal',
          'https://placehold.co/800x400/0F766E/ffffff?text=Apto+1%2FComedor',
          'https://placehold.co/800x400/0F766E/ffffff?text=Apto+1%2FBaño',
          'https://placehold.co/800x400/0F766E/ffffff?text=Apto+1%2FBalcón',
          'https://placehold.co/800x400/0F766E/ffffff?text=Apto+1%2FPlano',
        ],
        descripcion: 'Apartamento moderno y céntrico, perfecto para solteros o parejas. Disfrute de la vida urbana con todas las comodidades. Cercano a parques y transporte público.'
      },
      '5': {
        nombre: 'Departamento Penthouse con Vista al Mar',
        direccion: 'Malecón Cisneros 100, Miraflores',
        rentaMes: 550000,
        estado: 'Venta',
        imagenesUrl: [
          'https://placehold.co/800x400/BE123C/ffffff?text=Penthouse+5%2FVista+Mar',
          'https://placehold.co/800x400/BE123C/ffffff?text=Penthouse+5%2FTerraza',
          'https://placehold.co/800x400/BE123C/ffffff?text=Penthouse+5%2FInterior',
          'https://placehold.co/800x400/BE123C/ffffff?text=Penthouse+5%2FSala',
          'https://placehold.co/800x400/BE123C/ffffff?text=Penthouse+5%2FDormitorio',
        ],
        descripcion: 'Espectacular Penthouse con vistas panorámicas al Océano Pacífico. Incluye acabados de lujo, seguridad 24/7 y acceso directo al malecón. Una oportunidad única en la zona más exclusiva de Miraflores.'
      },
      'default': { 
        nombre: 'Moderno Dúplex con Balcón',
        direccion: 'Av. Sol 456, Barranco',
        rentaMes: 1200,
        estado: 'Alquiler', 
        imagenesUrl: [
          'https://placehold.co/800x400/4F46E5/ffffff?text=Dúplex+Barranco%2FExterior',
          'https://placehold.co/800x400/4F46E5/ffffff?text=Dúplex+Barranco%2FSala',
          'https://placehold.co/800x400/4F46E5/ffffff?text=Dúplex+Barranco%2FCocina',
          'https://placehold.co/800x400/4F46E5/ffffff?text=Dúplex+Barranco%2FBano',
          'https://placehold.co/800x400/4F46E5/ffffff?text=Dúplex+Barranco%2FPlano',
        ],
        descripcion: 'Dúplex ideal para familias o profesionales. Moderno, tranquilo y ubicado en una zona de fácil acceso. Disfrute de su balcón privado con vistas a la ciudad. ¡Listo para mudarse!'
      }
    };

    const data = mockData[id] || mockData['default'];
    this.propiedad = { id: id, ...data } as PropiedadDetalle; 
    this.indiceActual = 0; 
  }

  /**
   * @param direccion
   */
  cambiarImagen(direccion: number): void {
    if (!this.propiedad) return;

    const total = this.propiedad.imagenesUrl.length;
    let nuevoIndice = this.indiceActual + direccion;

    if (nuevoIndice < 0) {
      nuevoIndice = total - 1;
    } else if (nuevoIndice >= total) {
      nuevoIndice = 0;
    }

    this.indiceActual = nuevoIndice;
  }

  /**
   * 
   * @param indice
   */
  seleccionarImagen(indice: number): void {
    if (this.propiedad && indice >= 0 && indice < this.propiedad.imagenesUrl.length) {
      this.indiceActual = indice;
    }
  }

  /**
   * 
   * @param accion
   */
  mostrarAdvertencia(accion: string): void {
    let mensaje = '';
    switch (accion) {
      case 'Alquilar':
      case 'Comprar':
        mensaje = `La funcionalidad de '${accion.toUpperCase()}' requiere la autenticación del usuario y la activación de un servicio de contratos en el backend. Por favor, contacte a un asesor primero.`;
        break;
      case 'Contactar':
        mensaje = 'Gracias por su interés. Un asesor se pondrá en contacto con usted a la brevedad para brindarle más información y coordinar una visita.';
        break;
    }
    this.advertenciaMensaje = mensaje;
    setTimeout(() => {
      this.advertenciaMensaje = null;
    }, 5000);
  }
}