import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

type EstadoContrato = 'activo' | 'inactivo';

interface ContratoFormValue {
  cliente: string;
  inmueble: string;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoContrato;
}

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html',
  styleUrls: ['./contrato-form.component.css']
})
export class ContratoFormComponent implements OnInit {
  contratoForm: FormGroup;
  isEditMode = false;
  contratoId: string | null = null;
  loading = false;
  errorMessage = '';

  estados: EstadoContrato[] = ['activo', 'inactivo'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contratoForm = this.fb.group({
      cliente: ['', Validators.required],
      inmueble: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contratoId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.contratoId;

    if (this.isEditMode && this.contratoId) {
      this.loadContrato(this.contratoId);
    }
  }

  loadContrato(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    // TODO: Replace with backend API call to fetch contrato by id
    setTimeout(() => {
      const contratoData: ContratoFormValue = {
        cliente: 'Juan Pérez',
        inmueble: 'Inmueble A',
        fechaInicio: '2024-01-01',
        fechaFin: '2025-01-01',
        estado: 'activo'
      };

      this.contratoForm.setValue(contratoData);
      this.loading = false;
    }, 500);
  }

  onSubmit(): void {
    if (this.contratoForm.invalid) {
      this.contratoForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const contratoData = this.contratoForm.value as ContratoFormValue;

    if (this.isEditMode && this.contratoId) {
      // TODO: Call backend API to update contrato
      setTimeout(() => {
        this.loading = false;
        alert('Contrato actualizado correctamente.');
        this.router.navigate(['/contratos']);
      }, 1000);
    } else {
      // TODO: Call backend API to create new contrato
      setTimeout(() => {
        this.loading = false;
        alert('Contrato creado correctamente.');
        this.router.navigate(['/contratos']);
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/contratos']);
  }

  get cliente() {
    return this.contratoForm.get('cliente');
  }
  get inmueble() {
    return this.contratoForm.get('inmueble');
  }
  get fechaInicio() {
    return this.contratoForm.get('fechaInicio');
  }
  get fechaFin() {
    return this.contratoForm.get('fechaFin');
  }
  get estado() {
    return this.contratoForm.get('estado');
  }
}
