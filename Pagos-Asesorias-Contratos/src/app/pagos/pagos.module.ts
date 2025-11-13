import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagosRoutingModule } from './pagos-routing.module';

import { PagosListComponent } from './components/pagos-list/pagos-list.component';
import { PagoFormComponent } from './components/pago-form/pago-form.component';

@NgModule({
  declarations: [PagosListComponent, PagoFormComponent],
  imports: [CommonModule, ReactiveFormsModule, PagosRoutingModule]
})
export class PagosModule {}
