import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PagoService } from '../services/pago.service';

@Component({
  selector: 'app-inicio-free',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio-free.component.html',
  styleUrl: './inicio-free.component.css',
})
export class InicioFreeComponent {
  year = new Date().getFullYear();

  constructor(
    private auth: AuthService,
    private pagoService: PagoService,
    private router: Router
  ) {}

  mejorarPremium() {
    const usuario = this.auth.getUsuarioActualCache();
    if (!usuario) {
      alert('Usuario no cargado.');
      return;
    }

    const body = {
      usuarioId: usuario.id,
      monto: 49.9,
      moneda: 'USD',
    };

    this.pagoService.iniciarPagoPremium(body).subscribe({
      next: (res: any) => {
        const paypalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${res.referenciaPayPal}`;
        window.location.href = paypalUrl; // redirige a PayPal
      },
      error: (e) => {
        console.error(e);
        alert('Error iniciando pago premium');
      },
    });
  }
}
