// src/app/app.routes.ts
import { Routes } from '@angular/router';

// 🔹 COMPONENTES YA EXISTENTES
import { Principal } from './principal/principal';
import { ListaPropiedadesComponent } from './propiedades/lista-propiedades/lista-propiedades.component';
import { DetallePropiedadComponent } from './propiedades/detalle-propiedad/detalle-propiedad.component';
import { RegistroPropiedadComponent } from './propiedades/registro-propiedad/registro-propiedad.component';
import { ContratoComponent } from './propiedades/contrato/contrato.component';
import { GestionDocumentosComponent } from './propiedades/gestion-documentos/gestion-documentos.component';
import { ReportesComponent } from './reportes/dashboard/dashboard.component';
import { ConfiguracionComponent } from './reportes/configuracion/configuracion.component'; 
import { FinancieroComponent } from './reportes/financiero/financiero.component';
import { InquilinosComponent } from './reportes/inquilinos/inquilinos.component';

// 🔹 LOGIN + REGISTRO
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

// 🔹 NUEVOS COMPONENTES (solo frontend)
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { PagosComponent } from './pagos/pagos.component';
import { ContratosComponent } from './contratos/contratos.component';

export const routes: Routes = [

  // 🔹 Pantalla principal por defecto
  { path: '', component: Principal },

  // 🔹 Login y Registro
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // 🔹 Rutas existentes
  { path: 'propiedades', component: ListaPropiedadesComponent },
  { path: 'propiedades/:id', component: DetallePropiedadComponent },

  { path: 'registro-propiedad', component: RegistroPropiedadComponent },

  { 
    path: 'contrato/:id', 
    component: ContratoComponent, 
    title: 'Gestión de Contratos' 
  },

  { 
    path: 'documentos/:id', 
    component: GestionDocumentosComponent, 
    title: 'Gestión de Documentos' 
  },

  // 🔹 NUEVAS RUTAS (AGREGADAS)
  { path: 'asesorias', component: AsesoriasComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'contratos', component: ContratosComponent },

  // 🔹 Rutas de Reportes
  { 
    path: 'reportes', 
    component: ReportesComponent,
    title: 'Reportes y Gestión',

    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./reportes/dashboard/dashboard-content.component')
          .then(m => m.DashboardContentComponent),
        title: 'Vista General'
      },

      { 
        path: 'notificaciones', 
        loadComponent: () =>
          import('./reportes/notificaciones/notificaciones.component')
          .then(m => m.NotificacionesComponent),
        title: 'Centro de Notificaciones'
      },

      { 
        path: 'configuracion', 
        component: ConfiguracionComponent, 
        title: 'Configuración de Reportes'
      },

      { 
        path: 'financiero', 
        component: FinancieroComponent, 
        title: 'Reporte Financiero' 
      },

      {
        path: 'inquilinos',
        component: InquilinosComponent,
        title: 'Reporte Inquilinos'
      }
    ]
  },

  // 🔹 Error 404
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
