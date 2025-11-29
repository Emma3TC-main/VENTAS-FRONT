import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadesService, PropiedadResponse, CrearPropiedadRequest } from '../../../app/services/propiedades.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-propiedad',
  templateUrl: './editar-propiedades.component.html',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarPropiedadComponent implements OnInit {
  propiedadId!: string; 
  propiedadForm!: FormGroup;
  cargandoDatos = true;
  errorCarga = false; 
  guardadoExitoso = false; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private propiedadesService: PropiedadesService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();

    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        this.propiedadId = idStr;
        this.cargarDatosPropiedad(this.propiedadId);
      } else {
        console.error('Error: ID de propiedad no proporcionado. Redirigiendo...');
        this.router.navigate(['/propiedades/listado']);
      }
    });
  }

  inicializarFormulario(): void {
    this.propiedadForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      imagen: ['', Validators.required], 
      
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      calle: ['', Validators.required],
      latitud: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitud: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      
      precio: [0, [Validators.required, Validators.min(0)]],
      moneda: ['USD', Validators.required],
    });
  }

  cargarDatosPropiedad(id: string): void {
    this.propiedadesService.obtenerPorId(id).subscribe({
      next: (propiedad: PropiedadResponse) => {
        this.propiedadForm.patchValue({
             ...propiedad,
              imagen: (propiedad as any).imagen || '',
             precio: propiedad.precio ?? 0 
        }); 
        this.cargandoDatos = false;
        this.errorCarga = false;
      },
      error: (err) => {
        console.error('Error al cargar la propiedad:', err);
        this.errorCarga = true; 
        this.cargandoDatos = false;
      }
    });
  }

  onSubmit(): void {
    if (this.propiedadForm.valid) {
      this.cargandoDatos = true;
      this.guardadoExitoso = false; 
      
      console.log('--- SIMULACIÓN DE ENVÍO DE DATOS ---');
      console.log('Datos que se enviarían:', this.propiedadForm.value);
      
      setTimeout(() => {
        this.cargandoDatos = false; 
        this.guardadoExitoso = true;
        
        setTimeout(() => {
            this.router.navigate(['/propiedades/listado']);
        }, 2000);

      }, 1500); 

    } else {
      alert('Por favor, rellena todos los campos obligatorios antes de guardar.');
    }
  }
}