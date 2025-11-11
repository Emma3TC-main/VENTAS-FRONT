import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

interface Propiedad {
  id: number | string;
  nombre: string;
  direccion: string;
  rentaMes: number;
  estado: 'Disponible' | 'Ocupada' | 'En Mantenimiento';
  propietario: string;
  descripcionExterior: string;
  descripcionInterior: string;
  estadoDetalle: string;
  direccionCompleta: string;
}

interface Mantenimiento {
  fecha: string;
  descripcion: string;
  costo: number;
  estado: 'Pendiente' | 'En Progreso' | 'Completado';
}

@Component({
  selector: 'app-detalle-propiedad',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe], 
  templateUrl: './detalle-propiedad.component.html',
  styleUrl: './detalle-propiedad.component.css'
})
export class DetallePropiedadComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  
  propiedadId: string | null = null;
  propiedad: Propiedad | undefined; 
  
  mostrarContratoModal: boolean = false;
  contratoSimulado: string = ''; 

  mostrarEditarModal: boolean = false;
  propiedadEditable: Propiedad | undefined; 

  mostrarMantenimientoModal: boolean = false;
  historialMantenimientos: Mantenimiento[] = [];
  nuevoMantenimiento: Omit<Mantenimiento, 'costo' | 'estado'> = {
    fecha: new Date().toISOString().substring(0, 10),
    descripcion: ''
  };
  
  simulacionPropiedad: Propiedad = {
    id: 1,
    nombre: 'Apartamento de Lujo Vista Mar',
    direccion: 'Avenida del Sol 101',
    rentaMes: 2500,
    estado: 'Disponible',
    propietario: 'Juan Pérez',
    descripcionExterior: 'Grandes jardines y fachada de piedra.',
    descripcionInterior: '3 habitaciones, 2 baños, cocina integral.',
    estadoDetalle: 'Lista para alquiler inmediato',
    direccionCompleta: 'Avenida del Sol 101, Marbella, España'
  };

  constructor() { }

  ngOnInit(): void {
    this.propiedadId = this.route.snapshot.paramMap.get('id');
    
    if (this.propiedadId) {
      const idNum = Number(this.propiedadId);
      this.propiedad = { 
        ...this.simulacionPropiedad, 
        id: idNum, 
        nombre: `Propiedad ID ${idNum} - ${this.simulacionPropiedad.nombre}`,
        estado: idNum % 2 === 0 ? 'Ocupada' : 'Disponible' as 'Disponible' | 'Ocupada' | 'En Mantenimiento'
      };
      this.generarTextoContrato(this.propiedad);
      this.propiedadEditable = { ...this.propiedad }; 
      this.generarHistorialMantenimiento(idNum);
    } else {
      this.propiedad = this.simulacionPropiedad;
      this.generarTextoContrato(this.propiedad);
      this.propiedadEditable = { ...this.propiedad }; 
      this.generarHistorialMantenimiento(Number(this.simulacionPropiedad.id));
    }
  }
  
  private generarHistorialMantenimiento(propId: number): void {
    if (propId % 2 === 0) {
      this.historialMantenimientos = [
        { fecha: '2025-05-15', descripcion: 'Reparación de calentador de agua.', costo: 150.00, estado: 'Completado' },
        { fecha: '2025-09-01', descripcion: 'Pintura exterior y sellado de grietas.', costo: 800.50, estado: 'Completado' },
        { fecha: '2025-11-01', descripcion: 'Fuga en el grifo de la cocina.', costo: 0, estado: 'Pendiente' },
      ];
    } else {
      this.historialMantenimientos = [
        { fecha: '2025-07-20', descripcion: 'Mantenimiento preventivo de aire acondicionado.', costo: 300.00, estado: 'Completado' }
      ];
    }
  }

  abrirContratoModal(): void {
    this.mostrarContratoModal = true;
  }

  cerrarContratoModal(): void {
    this.mostrarContratoModal = false;
  }

  private generarTextoContrato(prop: Propiedad): void {
    this.contratoSimulado = `
      CONTRATO DE ARRENDAMIENTO
      ----------------------------------
      FECHA: 08 de Noviembre de 2025
      
      ARRENDADOR (PROPIETARIO): ${prop.propietario}
      ARRENDATARIO: (Pendiente de Asignar)
      
      PROPIEDAD:
        - Título: ${prop.nombre}
        - Dirección: ${prop.direccionCompleta}
        
      TÉRMINOS FINANCIEROS:
        - Renta Mensual: ${prop.rentaMes} USD
        - Duración: 12 meses (renovable)
        
      CLÁUSULA ÚNICA: El arrendatario se compromete a mantener el inmueble en el estado recibido y a cumplir con los pagos en las fechas estipuladas.
    `;
  }
  
  abrirEditarModal(): void {
    if (this.propiedad) {
      this.propiedadEditable = { ...this.propiedad }; 
      this.mostrarEditarModal = true;
    }
  }

  cerrarEditarModal(): void {
    this.mostrarEditarModal = false;
  }
  
  guardarEdicion(): void {
    if (this.propiedad && this.propiedadEditable) {
      this.propiedad = { ...this.propiedadEditable };
      console.log('Propiedad actualizada:', this.propiedad);
      this.generarTextoContrato(this.propiedad); 
      this.cerrarEditarModal();
    }
  }
  
  abrirMantenimientoModal(): void {
    this.mostrarMantenimientoModal = true;
  }

  cerrarMantenimientoModal(): void {
    this.mostrarMantenimientoModal = false;
  }
  
  registrarMantenimiento(): void {
    if (this.nuevoMantenimiento.descripcion.trim() === '') {
      console.error('La descripción no puede estar vacía.');
      return;
    }

    const nuevoRegistro: Mantenimiento = {
      fecha: this.nuevoMantenimiento.fecha,
      descripcion: this.nuevoMantenimiento.descripcion,
      costo: 0, 
      estado: 'Pendiente'
    };

    this.historialMantenimientos = [nuevoRegistro, ...this.historialMantenimientos];
    
    this.nuevoMantenimiento.descripcion = '';
    this.nuevoMantenimiento.fecha = new Date().toISOString().substring(0, 10);
    this.cerrarMantenimientoModal();
    console.log('Nuevo mantenimiento registrado:', nuevoRegistro);
  }
}