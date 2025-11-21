import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-free',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio-free.component.html',
  styleUrl: './inicio-free.component.css'
})
export class InicioFreeComponent {
  year = new Date().getFullYear();
}
