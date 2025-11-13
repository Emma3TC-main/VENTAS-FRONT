import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagosListComponent } from './components/pagos-list/pagos-list.component';
import { PagoFormComponent } from './components/pago-form/pago-form.component';

const routes: Routes = [
  { path: '', component: PagosListComponent },
  { path: 'nuevo', component: PagoFormComponent },
  { path: 'editar/:id', component: PagoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule {}
