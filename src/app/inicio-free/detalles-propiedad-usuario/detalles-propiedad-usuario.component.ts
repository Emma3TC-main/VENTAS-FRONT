import { 
    ChangeDetectionStrategy, 
    Component, 
    signal, 
    OnInit,
    Input,
    Output,
    EventEmitter 
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface PropertyDetail {
  title: string;
  address: string;
  price: number;
  currency: 'USD' | 'PEN';
  image: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-detalles-propiedad-usuario', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-propiedad-usuario.component.html', 
  styles: [
    `
      img {
        object-fit: cover;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallesPropiedadUsuarioComponent implements OnInit { 
    
    @Input() propiedadId!: string; 
  
    @Output() cerrarModalEvent = new EventEmitter<void>();

  private mockData: PropertyDetail = {
    title: 'Casa de Playa con Piscina',
    address: 'Calle 2, Asia, Cañete',
    price: 7000,
    currency: 'USD',
    image: 'https://placehold.co/1000x437/007FFF/ffffff?text=Casa+de+Playa+con+Piscina',
    description: 'Casa de lujo frente al mar en Asia: Disfruta de una experiencia única en esta espectacular propiedad que cuenta con 4 amplias habitaciones, 3 baños modernos, salón de juegos y una piscina temperada, perfecta para relajarte en cualquier momento del día.',
    location: 'Calle 2, Asia, Cañete',
    coordinates: {
      lat: -12.7581062,
      lng: -76.5989335,
    },
  };
  
  property = signal<PropertyDetail | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.property.set(this.mockData);
      this.loading.set(false);
    }, 500);
  }

  formatPrice(price: number, currency: 'USD' | 'PEN'): string {
    const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };
    return price.toLocaleString('es-PE', options);
  }

  handleAction(action: 'Alquilar' | 'Cerrar'): void { 
    
    if (action === 'Cerrar') {
        this.cerrarModalEvent.emit();
        return; 
    }
    
    const messageBox = document.getElementById('action-message-box');
    const messageText = document.getElementById('action-message-text');

    if (messageBox && messageText) {
        if (action === 'Alquilar') {
            messageText.innerText = '¡Proceso de Alquiler iniciado! Nos pondremos en contacto con el propietario de inmediato.';
            messageBox.className = 'fixed bottom-4 right-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-xl transition-opacity duration-300 opacity-100';
        } 
        
        messageBox.classList.remove('hidden');

        setTimeout(() => {
            messageBox.classList.add('opacity-0');
            setTimeout(() => {
                messageBox.classList.add('hidden');
            }, 300);
        }, 4000);
    }
  }
}