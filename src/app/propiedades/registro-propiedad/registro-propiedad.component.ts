// src/app/propiedades/registro-propiedad/registro-propiedad.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PropiedadesService } from '../../services/propiedades.service';

@Component({
  selector: 'app-registro-propiedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro-propiedad.component.html',
  styleUrls: ['./registro-propiedad.component.css']
})
export class RegistroPropiedadComponent implements OnInit {
  loading = false;
  buscandoGeo = false;
  mostrarConfirmacion = false;
  propiedadRegistrada: any = null;

  monedas = ['PEN', 'USD'];
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: PropiedadesService,
    private router: Router
  ) {}

  get f() { return this.registroForm.controls; }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required], // ojo: el html debe decir distrito
      calle: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      moneda: ['PEN', Validators.required],
      latitud: [0],
      longitud: [0]
    });
  }

  editarDatos() { this.mostrarConfirmacion = false; }

  // Llamado en blur de calle/distrito/provincia y antes de enviar
  async obtenerLatLng() {
    const provincia = (this.f['provincia'].value || '').toString().trim();
    const distrito  = (this.f['distrito'].value  || '').toString().trim();
    const calle     = (this.f['calle'].value     || '').toString().trim();

    if (!provincia || !distrito || !calle) return;

    const q = `${calle}, ${distrito}, ${provincia}, Peru`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=pe&q=${encodeURIComponent(q)}`;

    this.buscandoGeo = true;
    try {
      const resp = await fetch(url, { headers: { 'Accept-Language': 'es' } });
      const data = await resp.json();

      if (Array.isArray(data) && data.length > 0) {
        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);

        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
          this.registroForm.patchValue({ latitud: lat, longitud: lon }, { emitEvent: false });
        }
      }
    } catch (e) {
      // si falla, dejamos 0,0 y que el usuario pueda editar manualmente
      console.warn('No se pudo geocodificar', e);
    } finally {
      this.buscandoGeo = false;
    }
  }

  // simplifica foco fuera de cualquiera de los 3 campos
  onAddressBlur() { this.obtenerLatLng(); }

  async registrarPropiedad() {
    this.registroForm.markAllAsTouched();
    if (this.registroForm.invalid) {
      const firstInvalid = Object.keys(this.f).find(k => this.f[k].invalid);
      if (firstInvalid) {
        document
          .querySelector(`[formControlName="${firstInvalid}"]`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    this.loading = true;

    // asegurar lat/long calculados justo antes de enviar
    await this.obtenerLatLng();

    this.svc.crear(this.registroForm.value as any).subscribe({
      next: (r) => {
        this.propiedadRegistrada = r;
        this.mostrarConfirmacion = true;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/propiedades']), 1200);
      },
      error: (err) => {
        console.error('Error creando propiedad', err);
        this.loading = false;
      }
    });
  }
}

