import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface AuditoriaDetail {
  id: string;
  usuario: string;
  accion: string;
  fecha: string;
  detalle: string;
}

@Component({
  selector: 'app-auditoria-detail',
  templateUrl: './auditoria-detail.component.html',
  styleUrls: ['./auditoria-detail.component.css']
})
export class AuditoriaDetailComponent implements OnInit {
  auditoria: AuditoriaDetail | null = null;
  loading = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAuditoria(id);
    } else {
      this.errorMessage = 'ID de auditoría no especificado.';
    }
  }

  loadAuditoria(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    // TODO: Replace with backend API call to fetch auditoria detail by id
    setTimeout(() => {
      // Example data:
      this.auditoria = {
        id,
        usuario: 'juanp',
        accion: 'Crear contrato',
        fecha: '2024-06-05T14:00:00Z',
        detalle: 'Contrato C001 creado por juanp con detalles extensos.'
      };
      this.loading = false;
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/auditorias']);
  }
}
