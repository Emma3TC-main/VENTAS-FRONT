// src/app/propiedades/registro-propiedad/registro-propiedad.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-registro-propiedad',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule], 
  templateUrl: './registro-propiedad.component.html',
  styleUrl: './registro-propiedad.component.css' 
})
export class RegistroPropiedadComponent implements OnInit {

  registroForm: FormGroup;
  
  propiedadRegistrada: any | null = null; 
  mostrarConfirmacion: boolean = false;

  tiposPropiedad: string[] = ['Apartamento', 'Casa', 'Loft', 'Oficina', 'Local Comercial'];
  monedas: string[] = ['USD', 'EUR', 'MXN', 'COP'];

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      tipoPropiedad: ['', Validators.required],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      distrito: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      monto: [null, [Validators.required, Validators.min(1)]],
      moneda: ['USD', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  registrarPropiedad(): void {
    if (this.registroForm.valid) {
      const nuevaPropiedad = this.registroForm.value;
      console.log('Propiedad lista para registrar:', nuevaPropiedad);
      this.propiedadRegistrada = nuevaPropiedad;
      this.mostrarConfirmacion = true;
    } else {
      console.error('El formulario no es válido. Revisar campos.');
      this.registroForm.markAllAsTouched(); 
    }
  }
  editarDatos(): void {
    console.log('Iniciando edición de datos... (Esta función es un placeholder)');
    this.mostrarConfirmacion = false; 
  }
    get f() { return this.registroForm.controls; }
}