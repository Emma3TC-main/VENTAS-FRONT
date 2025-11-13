import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuditoriasRoutingModule } from './auditorias-routing.module';

import { AuditoriasListComponent } from './components/auditorias-list/auditorias-list.component';
import { AuditoriaDetailComponent } from './components/auditoria-detail/auditoria-detail.component';

@NgModule({
  declarations: [AuditoriasListComponent, AuditoriaDetailComponent],
  imports: [CommonModule, ReactiveFormsModule, AuditoriasRoutingModule]
})
export class AuditoriasModule {}
