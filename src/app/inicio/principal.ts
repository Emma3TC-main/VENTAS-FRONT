//principal.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-principal',
  imports: [RouterLink, CommonModule],
  templateUrl: './principal.component.html',
  standalone: true,
  styleUrl: './principal.css',
  
})
export class Principal {
year = new Date().getFullYear();
}
