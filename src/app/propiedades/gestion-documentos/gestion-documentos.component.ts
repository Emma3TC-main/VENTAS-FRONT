import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Documento {
  id: number;
  nombre: string;
  tipo: string;
  fechaCarga: string;
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
}

@Component({
  selector: 'app-gestion-documentos',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './gestion-documentos.component.html',
  styleUrl: './gestion-documentos.component.css'
})
export class GestionDocumentosComponent implements OnInit {

  propiedadId: string | null = null;
  documentoForm: FormGroup;
  
  documentos: Documento[] = [
    { id: 1, nombre: 'Contrato Alquiler 2025', tipo: 'Legal', fechaCarga: '2025-04-20', estado: 'Aprobado' },
    { id: 2, nombre: 'Identificación Inquilino', tipo: 'Personal', fechaCarga: '2025-04-21', estado: 'Pendiente' },
    { id: 3, nombre: 'Factura Agua Mayo', tipo: 'Servicio', fechaCarga: '2025-05-01', estado: 'Rechazado' },
  ];
  
  tiposDocumento: string[] = ['Legal', 'Personal', 'Servicio', 'Mantenimiento'];
  documentosMarcados: Documento[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.documentoForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      nombreDocumento: ['', Validators.required],
      descripcionDocumento: [''],
      archivo: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.propiedadId = this.route.snapshot.paramMap.get('id');
    console.log(`Cargando gestión de documentos para Propiedad ID: ${this.propiedadId}`);
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentoForm.patchValue({ archivo: file });
      console.log('Archivo seleccionado:', file.name);
    }
  }

  subirDocumento(): void {
    if (this.documentoForm.invalid) {
      this.documentoForm.markAllAsTouched();
      alert("Por favor, seleccione un archivo y rellene los campos requeridos.");
      return;
    }
    
    const nuevoId = this.documentos.length + 1;
    const nuevoDoc: Documento = {
      id: nuevoId,
      nombre: this.documentoForm.value.nombreDocumento,
      tipo: this.documentoForm.value.tipoDocumento,
      fechaCarga: new Date().toISOString().split('T')[0],
      estado: 'Pendiente'
    };
    this.documentos.push(nuevoDoc);
    
    alert(`Documento '${nuevoDoc.nombre}' subido exitosamente. (Simulación)`);
    this.documentoForm.reset({
        tipoDocumento: '',
        descripcionDocumento: '',
        archivo: null
    });
  }
  
  marcarDocumento(documento: Documento, event: any): void {
    if (event.target.checked) {
        this.documentosMarcados.push(documento);
    } else {
        this.documentosMarcados = this.documentosMarcados.filter(d => d.id !== documento.id);
    }
  }

  descargarDocumento(doc: Documento): void {
    alert(`Simulando la descarga del documento: ${doc.nombre}`);
  }

  eliminarDocumento(id: number): void {
    this.documentos = this.documentos.filter(d => d.id !== id);
    alert(`Documento ID ${id} eliminado.`);
  }

  verDocumentoMarcado(): void {
    if (this.documentosMarcados.length === 1) {
        alert(`Simulando la vista previa del documento: ${this.documentosMarcados[0].nombre}`);
    } else if (this.documentosMarcados.length > 1) {
        alert(`Solo se puede ver un documento a la vez. Marcados: ${this.documentosMarcados.length}`);
    } else {
        alert("Por favor, marque un documento en la tabla para ver.");
    }
  }

  get f() { return this.documentoForm.controls; }
}