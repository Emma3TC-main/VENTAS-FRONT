import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent implements OnInit {

  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  
  propiedadId: string | null = null;
  contratoForm: FormGroup;
  
  clausulasSimuladas: string[] = [
    'El arrendatario es responsable de los servicios públicos.',
    'Se requiere un depósito de seguridad equivalente a dos meses de renta.',
  ];

  propiedadSimulada = {
    titulo: 'Casa Moderna con Jardín',
    direccion: 'Calle Falsa 123, Ciudad de México',
    monto: 1500,
    moneda: 'USD'
  };

  tiposContrato: string[] = ['Alquiler Habitacional', 'Arrendamiento Comercial', 'Venta a Plazos'];
  
  nuevaClausulaControl = new FormControl(''); 

  constructor() {
    this.contratoForm = this.fb.group({
      inquilino: ['', Validators.required],
      propietario: ['', Validators.required],
      fechaInicio: [this.getCurrentDateString(), Validators.required], 
      fechaFin: [this.getDateOneYearFromNowString(), Validators.required],
      monto: [null, [Validators.required, Validators.min(1)]],
      tipoContrato: ['', Validators.required],
      clausulas: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.propiedadId = this.route.snapshot.paramMap.get('id');
    console.log(`Cargando contrato para la Propiedad ID: ${this.propiedadId}`);
    
    this.contratoForm.patchValue({
        propietario: 'iRentasPro S.A.',
        monto: this.propiedadSimulada.monto,
        tipoContrato: this.tiposContrato[0]
    });

    this.clausulasSimuladas.forEach(clausula => this.clausulasArray.push(new FormControl(clausula)));
  }

  private getCurrentDateString(): string {
    return new Date().toISOString().substring(0, 10);
  }

  private getDateOneYearFromNowString(): string {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return nextYear.toISOString().substring(0, 10);
  }
  
  get clausulasArray(): FormArray {
    return this.contratoForm.get('clausulas') as FormArray;
  }

  agregarClausula(): void {
    const clausulaTexto = this.nuevaClausulaControl.value;
    if (clausulaTexto?.trim()) {
      this.clausulasArray.push(new FormControl(clausulaTexto.trim()));
      this.nuevaClausulaControl.reset(''); 
      console.log('Cláusula agregada.');
    } else {
      console.warn('La cláusula no puede estar vacía.');
    }
  }

  eliminarClausula(index: number): void {
    this.clausulasArray.removeAt(index);
    console.log(`Cláusula en posición ${index} eliminada.`);
  }

  simularEliminarContrato(): void {
      console.warn("Se ha simulado la eliminación de este borrador de contrato.");
      this.contratoForm.reset({
        propietario: 'iRentasPro S.A.',
        monto: this.propiedadSimulada.monto,
        tipoContrato: this.tiposContrato[0],
        fechaInicio: this.getCurrentDateString(), 
        fechaFin: this.getDateOneYearFromNowString(),
      });
      this.clausulasArray.clear(); 
      this.nuevaClausulaControl.reset('');
  }

  firmarContrato(): void {
    if (this.contratoForm.invalid) {
      this.contratoForm.markAllAsTouched();
      console.error("Por favor, rellene todos los campos requeridos antes de firmar.");
      return;
    }
    
    console.log('¡Contrato Generado y Firmado!');
    console.log('Datos del Contrato:', this.contratoForm.value);
  }

  get f() { return this.contratoForm.controls; }
}