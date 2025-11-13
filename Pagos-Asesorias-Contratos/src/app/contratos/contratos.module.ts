import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContratosRoutingModule } from './contratos-routing.module';

import { ContratosListComponent } from './components/contratos-list/contratos-list.component';
import { ContratoFormComponent } from './components/contrato-form/contrato-form.component';

@NgModule({
  declarations: [ContratosListComponent, ContratoFormComponent],
  imports: [CommonModule, ReactiveFormsModule, ContratosRoutingModule]
})
export class ContratosModule {}
