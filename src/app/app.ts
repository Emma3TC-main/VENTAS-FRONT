import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

// ARREGLO 1: Importamos la clase "Principal"
import { Principal } from './inicio/principal'; 

@Component({
  selector: 'app-root',
  standalone: true,
  
  // ARREGLO 2: Usamos "Principal" en el array de imports
  imports: [RouterOutlet, Principal, RouterLink], 
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-front');
}