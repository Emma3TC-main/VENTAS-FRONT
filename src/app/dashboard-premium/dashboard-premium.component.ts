import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-premium',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-premium.component.html',
  styleUrl: './dashboard-premium.component.css'
})
export class DashboardPremiumComponent {

  usuarioNombre: string = '';
  year: number = new Date().getFullYear();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    const user = this.auth.getUsuarioActual();
    this.usuarioNombre = user ? user.nombre : 'Usuario Premium';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);   // Redirige a la landing pública
  }
}
