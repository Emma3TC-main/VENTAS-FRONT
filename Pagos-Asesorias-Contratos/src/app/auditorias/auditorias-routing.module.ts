import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuditoriasListComponent } from './components/auditorias-list/auditorias-list.component';
import { AuditoriaDetailComponent } from './components/auditoria-detail/auditoria-detail.component';

const routes: Routes = [
  { path: '', component: AuditoriasListComponent },
  { path: ':id', component: AuditoriaDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriasRoutingModule {}
