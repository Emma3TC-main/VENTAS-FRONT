import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Real Estate System';

  constructor(private router: Router) {}

  navigateTo(module: string): void {
    this.router.navigate([`/${module}`]);
    // This method could be extended to check user permissions or load data
  }
}
