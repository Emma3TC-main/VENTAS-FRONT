import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface PagoFormValue {
  fecha: string;
  monto: number;
  metodo: string;
  contratoId: string;
}

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {
  pagoForm: FormGroup;
  isEditMode = false;
  pagoId: string | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pagoForm = this.fb.group({
      fecha: ['', Validators.required],
      monto: [
        '',
        [Validators.required, Validators.min(0)]
      ],
      metodo: ['', Validators.required],
      contratoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pagoId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.pagoId;

    if (this.isEditMode && this.pagoId) {
      this.loadPago(this.pagoId);
    }
  }

  loadPago(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    // TODO: Replace with backend call to fetch pago by id
    // Simulated fetch with sample data and delay
    setTimeout(() => {
      // Example fetched data:
      const pagoData: PagoFormValue = {
        fecha: '2024-06-01',
        monto: 1200,
        metodo: 'Transferencia',
        contratoId: 'C001'
      };

      this.pagoForm.setValue(pagoData);
      this.loading = false;
    }, 500);
  }

  onSubmit(): void {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const pagoData = this.pagoForm.value as PagoFormValue;

    if (this.isEditMode && this.pagoId) {
      // TODO: Call backend API to update pago
      setTimeout(() => {
        this.loading = false;
        alert('Pago actualizado correctamente.');
        this.router.navigate(['/pagos']);
      }, 1000);
    } else {
      // TODO: Call backend API to create new pago
      setTimeout(() => {
        this.loading = false;
        alert('Pago creado correctamente.');
        this.router.navigate(['/pagos']);
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/pagos']);
  }

  get fecha() {
    return this.pagoForm.get('fecha');
  }
  get monto() {
    return this.pagoForm.get('monto');
  }
  get metodo() {
    return this.pagoForm.get('metodo');
  }
  get contratoId() {
    return this.pagoForm.get('contratoId');
  }
}
