import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContratosListComponent } from './components/contratos-list/contratos-list.component';
import { ContratoFormComponent } from './components/contrato-form/contrato-form.component';

const routes: Routes = [
  { path: '', component: ContratosListComponent },
  { path: 'nuevo', component: ContratoFormComponent },
  { path: 'editar/:id', component: ContratoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosRoutingModule {}
