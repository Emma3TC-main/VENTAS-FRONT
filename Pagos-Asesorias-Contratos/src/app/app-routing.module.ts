import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/pagos', pathMatch: 'full' },
  {
    path: 'pagos',
    loadChildren: () =>
      import('./pagos/pagos.module').then(m => m.PagosModule)
  },
  {
    path: 'auditorias',
    loadChildren: () =>
      import('./auditorias/auditorias.module').then(m => m.AuditoriasModule)
  },
  {
    path: 'contratos',
    loadChildren: () =>
      import('./contratos/contratos.module').then(m => m.ContratosModule)
  },
  { path: '**', redirectTo: '/pagos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
