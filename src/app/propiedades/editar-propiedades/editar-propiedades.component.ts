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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private propiedadesService: PropiedadesService
  ) { }

  ngOnInit(): void {
    // 1. Inicializar el formulario
    this.inicializarFormulario();

    // 2. Obtener el ID de la URL y cargar los datos
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        this.propiedadId = idStr;
        this.cargarDatosPropiedad(this.propiedadId);
      } else {
        // Manejar caso de ID faltante
        alert('ID de propiedad no proporcionado. Redirigiendo al listado.');
        this.router.navigate(['/propiedades/listado']);
      }
    });
  }

  inicializarFormulario(): void {
    this.propiedadForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      // Campos de Ubicación
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      calle: ['', Validators.required],
      latitud: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitud: [0, [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      
      // Campos de Precio
      // Usamos el operador ?? para asegurar que el valor inicial sea un número (0) si el campo viene nulo del backend.
      precio: [0, [Validators.required, Validators.min(0)]],
      moneda: ['USD', Validators.required],
    });
  }

  cargarDatosPropiedad(id: string): void {
    this.propiedadesService.obtenerPorId(id).subscribe({
      next: (propiedad: PropiedadResponse) => {
        // 3. Rellenar el formulario con los datos de respuesta
        this.propiedadForm.patchValue({
             ...propiedad,
             // Aseguramos que el precio sea 0 si viene nulo del backend
             precio: propiedad.precio ?? 0 
        }); 
        this.cargandoDatos = false;
      },
      error: (err) => {
        console.error('Error al cargar la propiedad:', err);
        alert('No se pudo cargar la propiedad para edición. Verifique el endpoint GET por ID.');
        this.router.navigate(['/propiedades/listado']);
      }
    });
  }

  onSubmit(): void {
    if (this.propiedadForm.valid) {
      this.cargandoDatos = true;
      const request: CrearPropiedadRequest = this.propiedadForm.value;

      // Llamar al método de actualización (PUT)
      this.propiedadesService.actualizar(this.propiedadId, request).subscribe({
        next: (res) => {
          alert(`Propiedad "${res.titulo}" actualizada correctamente.`);
          this.router.navigate(['/propiedades/listado']);
        },
        error: (err) => {
          this.cargandoDatos = false;
          console.error('Error en la actualización (PUT):', err);
          alert('Error al guardar los cambios. Revisa la consola para detalles.');
        }
      });
    }
  }
}