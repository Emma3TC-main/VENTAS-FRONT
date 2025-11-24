import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium-confirmar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premium-confirmar.component.html',
  styleUrls: ['./premium-confirmar.component.css'],
})
export class PremiumConfirmarComponent implements OnInit {
  cargando = true;
  mensaje = '';
  error = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.error = true;
      this.mensaje = 'Token inválido. No se puede procesar el pago.';
      this.cargando = false;
      return;
    }

    this.http
      .post('http://localhost:8080/api/pagos/premium/capturar?token=' + token, {})
      .subscribe({
        next: (resp: any) => {
          this.cargando = false;
          this.mensaje = resp.mensaje || 'Pago confirmado correctamente';
        },
        error: () => {
          this.error = true;
          this.cargando = false;
          this.mensaje = 'Error confirmando el pago. Tu cuenta sigue en modo FREE.';
        },
      });
  }

  irDashboard() {
    this.router.navigate(['/dashboard-premium']);
  }
}
