import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// ARREGLO 1: Importamos la clase "Principal"
import { Principal } from './principal/principal'; 

@Component({
  selector: 'app-root',
  standalone: true,
  
  // ARREGLO 2: Usamos "Principal" en el array de imports
  imports: [RouterOutlet, Principal], 
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-front');
}